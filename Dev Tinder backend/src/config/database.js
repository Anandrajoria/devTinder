const mongoose = require("mongoose");

const connectDB = async  () => {
  
  mongoose.connect("mongodb+srv://anandrajoriya03_db_user:aAREm8GT5oTvJpCU@cluster0.fk693ll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

module.exports = connectDB;
