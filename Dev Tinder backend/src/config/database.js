const mongoose = require("mongoose");

const connectDB = async  () => {
  
  // mongoose.connect(process.env.MONGO_URL);
  mongoose.connect("mongodb+srv://anandrajoriya03:Adi94144@namestenode.cuxwa6h.mongodb.net/?retryWrites=true&w=majority&appName=namesteNode");
}

module.exports = connectDB;

