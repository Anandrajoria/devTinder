const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();
const mongoose = require('mongoose');

// Sending the request to other user
requestRouter.post(
  "/request/send/:status/:receiverId",
  userAuth,
  async (req, res) => {
    try {
      const senderId = req.user._id;
      const senderUserName = req.user.userName;
      const { receiverId, status } = req.params;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "invalid status type",
          status,
        });
      }

      // Validate receiverId
      if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }

      // Check if trying to send request to self
      if (senderId.equals(receiverId)) {
        return res
          .status(400)
          .json({ error: "You cannot send a connection request to yourself." });
      }

      const toUser = await User.findById(receiverId);
      if (!toUser) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      
      const receiverUserName = toUser.userName;

      // Check for existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      if (existingConnectionRequest) {
        // Allow reviving old rejected/ignored/removed requests
        if (existingConnectionRequest.status === "rejected" || 
            existingConnectionRequest.status === "ignored" ||
            existingConnectionRequest.status === "removed") {
          
          // Update the existing request instead of creating new one
          existingConnectionRequest.status = status;
          existingConnectionRequest.senderId = senderId;
          existingConnectionRequest.receiverId = receiverId;
          existingConnectionRequest.senderUserName = senderUserName;
          existingConnectionRequest.receiverUserName = receiverUserName;
          
          const updatedRequest = await existingConnectionRequest.save();
          
          return res.json({
            message: req.user.firstName + " " + status + " " + toUser.firstName + " (request updated)",
            data: updatedRequest,
          });
        }
        
        return res.status(400).json({
          message: `Connection request already exists with status: ${existingConnectionRequest.status}`,
        });
      }

      // Create new connection request
      const connectionRequest = new ConnectionRequest({
        receiverId,
        senderId,
        status,
        senderUserName,
        receiverUserName,
      });
      
      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + " " + status + " " + toUser.firstName,
        data,
      });
    } catch (error) {
      console.error("ERROR SENDING REQUEST:", error);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  }
);

// Cancel/Unrequest a sent request
requestRouter.delete("/request/cancel/:receiverId", userAuth, async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;

    // Validate receiverId
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find and delete the request (only if it's still "interested")
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
    console.error("ERROR CANCELLING REQUEST:", error);
    res.status(500).json({ message: "Server error while cancelling request." });
  }
});

// Answering the request 
requestRouter.patch('/request/respond/:requestId', userAuth, async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const userId = req.user._id;
    
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ 
        message: `The provided ID '${requestId}' is not a valid format.` 
      });
    }

    const allowedStatus = ['accepted', 'rejected'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Status must be either 'accepted' or 'rejected'."
      });
    }

    const request = await ConnectionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ 
        message: `Connection request with ID '${requestId}' not found.` 
      });
    }
        
    if (!request.receiverId.equals(userId)) {
      return res.status(403).json({ 
        message: "Forbidden: You are not authorized to respond to this request." 
      });
    }
    
    // Only allow responding to "interested" requests
    if (request.status !== "interested") {
      return res.status(400).json({ 
        message: `Cannot respond to request with status: ${request.status}` 
      });
    }

    request.status = status;
    const updateData = await request.save();

    res.json({
      message: `Request has been ${status}.`,
      data: updateData
    });

  } catch (error) {
    console.error("ERROR RESPONDING TO REQUEST:", error);
    res.status(500).json({ 
      message: "An internal server error occurred on the server." 
    });
  }
});

// Get all sent requests by the logged-in user
requestRouter.get("/request/sent", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const sentRequests = await ConnectionRequest.find({
      senderId: userId,
      status: { $in: ["interested", "accepted", "rejected"] }
    }).populate("receiverId", "firstName lastName photoUrl age gender");

    res.json({
      message: "Sent requests fetched successfully",
      data: sentRequests
    });

  } catch (error) {
    console.error("ERROR FETCHING SENT REQUESTS:", error);
    res.status(500).json({ 
      message: "Server error while fetching sent requests." 
    });
  }
});

// Get all received requests by the logged-in user
requestRouter.get("/request/received", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const receivedRequests = await ConnectionRequest.find({
      receiverId: userId,
      status: "interested"
    }).populate("senderId", "firstName lastName photoUrl age gender");

    res.json({
      message: "Received requests fetched successfully",
      data: receivedRequests
    });

  } catch (error) {
    console.error("ERROR FETCHING RECEIVED REQUESTS:", error);
    res.status(500).json({ 
      message: "Server error while fetching received requests." 
    });
  }
});

// Get all connections (accepted requests)
requestRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const connections = await ConnectionRequest.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ],
      status: "accepted"
    })
    .populate("senderId", "firstName lastName photoUrl age gender")
    .populate("receiverId", "firstName lastName photoUrl age gender");

    res.json({
      message: "Connections fetched successfully",
      data: connections
    });

  } catch (error) {
    console.error("ERROR FETCHING CONNECTIONS:", error);
    res.status(500).json({ 
      message: "Server error while fetching connections." 
    });
  }
});

// Remove/Disconnect from an accepted connection
requestRouter.post("/connection/remove/:userId", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const userToRemoveId = req.params.userId;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userToRemoveId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find and update the accepted connection to "removed"
    const result = await ConnectionRequest.findOneAndUpdate(
      {
        status: "accepted", // only remove if they are connected
        $or: [
          { senderId: loggedInUserId, receiverId: userToRemoveId },
          { senderId: userToRemoveId, receiverId: loggedInUserId },
        ],
      },
      { status: "removed" }, // mark as removed
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Connection not found." });
    }

    res.status(200).json({
      message: "Connection removed successfully. User will now appear in your feed again.",
      data: result,
    });
  } catch (error) {
    console.error("ERROR REMOVING CONNECTION:", error);
    res.status(500).json({ message: "Server error while removing connection." });
  }
});

module.exports = requestRouter;