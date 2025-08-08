const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User = require("../models/user");

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




userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    let query = {};
    
    // Check if a user is logged in
    if (req.user) {
      // --- LOGGED-IN USER LOGIC (Personalized Feed) ---
      const loggedInUserId = req.user._id;

      // Find all user IDs that the logged-in user has already sent a request to
      const existingRequests = await ConnectionRequest.find({
        senderId: loggedInUserId,
      }).select("receiverId");

      const excludedUserIds = existingRequests.map(req => req.receiverId.toString());
      excludedUserIds.push(loggedInUserId.toString()); // Hide the logged-in user themselves

      // Update the query to exclude these users
      query = { _id: { $nin: excludedUserIds } };

    } else {
      // --- GUEST USER LOGIC (Generic Feed) ---
      // No specific filters are needed, but you could add some,
      // e.g., filter out admin accounts if you have them.
      query = {}; 
    }

    // Execute the query for either logged-in users or guests
    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Feed fetched successfully.",
      page,
      totalPages: Math.ceil(totalUsers / limit),
      data: users,
    });
    
  } catch (error) {
    console.error("ERROR in /user/feed:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
});


// POST /api/v1/connection/remove/:userId
userRouter.post("/remove/:userId", userAuth, async (req, res) => {
  try {
    // ✅ FIX 1: Changed req.User to the correct req.user (lowercase 'u').
    const loggedInUserId = req.user._id;
    const userToRemoveId = req.params.userId;

    // ✅ FIX 2: Changed Connection to ConnectionRequest to match the imported model name.
    const result = await ConnectionRequest.deleteOne({
      status: "accepted",
      $or: [
        { senderId: loggedInUserId, receiverId: userToRemoveId },
        { senderId: userToRemoveId, receiverId: loggedInUserId },
      ],
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Connection not found." });
    }

    res.status(200).json({ message: "Connection removed successfully." });
    
  } catch (error) {
    console.error("ERROR REMOVING CONNECTION:", error);
    res.status(500).json({ message: "Server error while removing connection." });
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
