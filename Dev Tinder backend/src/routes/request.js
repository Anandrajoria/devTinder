const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();
const mongoose = require('mongoose');



// sending the request to other user
requestRouter.post(
  "/request/send/:status/:receiverId",
  userAuth,
  async (req, res) => {
    try {
      const senderId = req.user._id;
      // const receiverId = req.params.receiverId;
      // const status = req.params.status;
      const senderUserName = req.user.userName;
      const { receiverId, status } = req.params;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "invalid status type",
          status,
        });
      }

      const toUser = await User.findById(receiverId);
      if (!toUser) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      const receiverUserName = toUser.userName;
      //if there is ecisting connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      if (senderId.equals(receiverId)) {
        return res
          .status(400)
          .json({ error: "You cannot send a connection request to yourself." });
      }
      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "connection request already existed",
        });
      }

      const connectionRequest = new ConnectionRequest({
        receiverId,
        senderId,
        status,
        senderUserName,
        receiverUserName,
      });
      
      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + " " + status +" "+ toUser.firstName,
        data,
      });
    } catch (error) {
      console.error("ERROR SENDING REQUEST:", error);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  }
);



// answering the request 
requestRouter.patch('/request/respond/:requestId',userAuth,async(req,res)=>{
  try {
    const {requestId}=req.params;
    const {status} = req.body;
    const userId=req.user._id;
    
    
    if(!mongoose.Types.ObjectId.isValid(requestId)){
      return res.status(400).json({ message: `The provided ID '${requestId}' is not a valid format.` });
    }

     const allowedStatus=['accepted','rejected'];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Status must be either 'accepted' or 'rejected'."})
    }


    const request=await ConnectionRequest.findById(requestId)

    if (!request) {
            return res.status(404).json({ message: `Connection request with ID '${requestId}' not found.` });
        }
        
    if (!request.receiverId.equals(userId)) {
      return res.status(403).json({ message: "Forbidden: You are not authorized to respond to this request." });
    }
    

    request.status=status;
    const updateData=await request.save()


    res.json({
        message: `Request has been ${status}.`,
        data: updateData
    });

  } catch (error) {
    console.error("ERROR RESPONDING TO REQUEST:", error);
    res.status(500).json({ message: "An internal server error occurred on the server." });
  }
})



    module.exports = requestRouter;