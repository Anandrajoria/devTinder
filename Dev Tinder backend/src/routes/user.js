const express = require("express");
const { userAuth, userAuthOptional } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const connectionRequest = await ConnectionRequest.find({
      receiverId: loggedInUserId,
      status: "interested",
    }).populate("senderId", USER_SAFE_DATA);

    const data = connectionRequest;

    res.json({ message: "data fetched successfully", data });
  } catch (error) {
    console.error("ERROR FETCHING REQUESTS:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
});

//get all connection of user
userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const connections = await ConnectionRequest.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
      status: "accepted",
    })
      .populate("senderId", USER_SAFE_DATA)
      .populate("receiverId", USER_SAFE_DATA);

    res.json({ data: connections });
  } catch (error) {
    console.error("ERROR FETCHING CONNECTIONS:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
});

userRouter.post("/request/:userId", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const receiverId = req.params.userId;

    // Validate receiverId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check if trying to send request to self
    if (loggedInUserId.toString() === receiverId.toString()) {
      return res.status(400).json({ message: "Cannot send request to yourself" });
    }

    // Check if receiver exists
    const receiverUser = await User.findById(receiverId);
    if (!receiverUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if request already exists
    let existingRequest = await ConnectionRequest.findOne({
      $or: [
        { senderId: loggedInUserId, receiverId },
        { senderId: receiverId, receiverId: loggedInUserId }
      ]
    });

    console.log("Existing request:", existingRequest); // 🐛 Debug log

    if (existingRequest) {
      // Allow reviving rejected, ignored, or removed requests
      if (existingRequest.status === "removed" || 
          existingRequest.status === "rejected" || 
          existingRequest.status === "ignored") {
        
        existingRequest.status = "interested";
        existingRequest.senderId = loggedInUserId;
        existingRequest.receiverId = receiverId;
        existingRequest.senderUserName = req.user.userName;
        existingRequest.receiverUserName = receiverUser.userName;
        await existingRequest.save();

        return res.status(200).json({
          message: "Connection request re-sent.",
          data: existingRequest
        });
      } else {
        return res.status(400).json({ 
          message: `Connection request already exists with status: ${existingRequest.status}` 
        });
      }
    }

    // Create new request
    const newRequest = new ConnectionRequest({
      senderId: loggedInUserId,
      receiverId,
      senderUserName: req.user.userName,
      receiverUserName: receiverUser.userName, // 🐛 FIXED: was receiverId.receiverUserName
      status: "interested"
    });

    await newRequest.save();

    res.status(201).json({
      message: "Connection request sent successfully.",
      data: newRequest
    });

  } catch (error) {
    console.error("ERROR SENDING REQUEST:", error);
    res.status(500).json({ message: "Server error while sending request." });
  }
});

// 🐛 FIXED: Feed route - changed "pending" to "interested"
// Updated feed route - put this in your userRouter
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Only hide users with ACTIVE statuses (not removed/rejected)
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { receiverId: loggedInUser._id },
        { senderId: loggedInUser._id }
      ],
      status: { $in: ["interested", "accepted"] }  // ✅ Don't include "removed" here
    }).select("receiverId senderId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.receiverId.toString());
      hideUsersFromFeed.add(req.senderId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// 🆕 NEW: Unrequest route
userRouter.delete("/request/unrequest/:userId", userAuth, async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.userId;

    // Find and delete the request
    const deletedRequest = await ConnectionRequest.findOneAndDelete({
      senderId,
      receiverId,
      status: "interested"
    });

    if (!deletedRequest) {
      return res.status(404).json({ 
        message: "No pending request found to cancel" 
      });
    }

    res.json({ 
      message: "Request cancelled successfully",
      data: deletedRequest
    });

  } catch (error) {
    console.error("ERROR UNREQUESTING:", error);
    res.status(500).json({ message: "Server error while cancelling request." });
  }
});

userRouter.post("/remove/:userId", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const userToRemoveId = req.params.userId;

    const result = await ConnectionRequest.findOneAndUpdate(
      {
        status: "accepted", // only remove if they are connected
        $or: [
          { senderId: loggedInUserId, receiverId: userToRemoveId },
          { senderId: userToRemoveId, receiverId: loggedInUserId },
        ],
      },
      { status: "removed" }, // ✅ mark as removed
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Connection not found." });
    }

    res.status(200).json({
      message: "Connection removed successfully.",
      data: result,
    });
  } catch (error) {
    console.error("ERROR REMOVING CONNECTION:", error);
    res
      .status(500)
      .json({ message: "Server error while removing connection." });
  }
});

userRouter.get("/profile/:userId", userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const userProfile = await User.findById(userId).select("-password");

    if (!userProfile) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error("ERROR FETCHING USER PROFILE:", error);
    res.status(500).json({ message: "Server error while fetching profile." });
  }
});

module.exports = userRouter;