const mongoose = require("mongoose");

const ConnectionRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      required:true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        default:'pending',
        message: "{VALUE} is not a valid status.",
      },
      
    },
    senderUserName:{type:String , required:true},
    receiverUserName:{type:String , required:true}
  },
  {
    timestamps: true,
  }
);
ConnectionRequestSchema.index({senderId:1,receiverId:1})
ConnectionRequestSchema.index({ receiverId: 1, createdAt: 1 }); 
ConnectionRequestSchema.index({ senderId: 1, createdAt: 1 });

const ConnectionRequestModel = new mongoose.model(
  "connectionRequest",
  ConnectionRequestSchema
);


module.exports = ConnectionRequestModel;
