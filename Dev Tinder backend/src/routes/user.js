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
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { senderId: loggedInUserId, status: "accepted" },
        { receiverId: loggedInUserId, status: "accepted" },
      ],
    }).populate("senderId", USER_SAFE_DATA).
    populate('receiverId',USER_SAFE_DATA)
    res.json({ data: connectionRequest });
  } catch (error) {
    console.error("ERROR FETCHING ALL REQUESTS:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
});

//feed api
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Get connection requests involving the user
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ sender: loggedInUserId }, { receiver: loggedInUserId }],
    }).select("sender receiver");

    // Collect user IDs to hide
    const hideUserFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.sender.toString());
      hideUserFromFeed.add(req.receiver.toString());
    });
    hideUserFromFeed.add(loggedInUserId.toString());

    // Filtered user query
    const query = {
      _id: { $nin: Array.from(hideUserFromFeed) },
    };

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Feed fetched successfully.",
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      data: users,
    });
  } catch (error) {
    console.error("ERROR in /user/feed:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
});


module.exports = userRouter;
