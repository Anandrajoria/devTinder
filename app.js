const express = require("express");
const app = express();
const connectDB = require("./src/config/database");
const User = require("./src/models/user");

app.post("/signup", async (req, res) => {
  //!creating a instance of user model
  const user = new User({
    firstName: "aditya",
    lastName: "raj",
    email: "asdhfas",
    passward: "adi2302",
  });

  try {
    await user.save();
    res.send("user added successfuly");
  } catch (err) {
    res.status(400).send("err saying user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("database connection successful");
    app.listen(7777, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
