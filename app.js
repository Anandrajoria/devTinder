const express = require("express");
const app = express();
const connectDB = require("./src/config/database");
const User = require("./src/models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  //!creating a instance of user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfuly");
  } catch (err) {
    res.status(400).send("err saying user:" + err.message);
  }
});

//get user by firstname findOne()
app.get("/user", async (req, res) => {
  const userFirstName = req.body.firstName;
  try {
    const users = await User.findOne({ firstName: userFirstName });
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//! feed api = GET /feed - get all the users form database
app.get("/feed", async (sreq, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
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
