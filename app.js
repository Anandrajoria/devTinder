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

// get user by userID
app.get('/user', async (req,res)=>{
  const userEmail=req.body.email
  try {
    const user=await User.find({email:userEmail})
    res.send(user)
  } catch (error) {
    res.status(500).send("something went wrong")
  }
})

// get all user data
app.get("/feed",async(req,res)=>{
  try {
    const feed=await User.find({})
    res.send(feed)
  } catch (error) {
    res.status(500).send("something went wrong")
  }
})


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
