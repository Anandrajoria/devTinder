const express = require("express");
const app = express();
const connectDB = require("./src/config/database");
const User = require("./src/models/user");
// const user = require("./src/models/user");

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

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    res.send(user);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

// get all user data
app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.send(feed);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

//delete api
app.delete("/user",async (req,res)=>{
  const userId=req.body.userId
  try {
    await User.findByIdAndDelete({_id:userId})
    await User.findByIdAndDelete(userId)
    res.send("user deleted successfully")
  } catch (err) {
    res.status(400).send(err)
  }
})

//user data update api based on id
app.patch("/user",async(req,res)=>{
  const userId=req.body.userId
  const data=req.body
  try {
    await User.findByIdAndUpdate({_id:userId},data)
    runValidator:true
    res.send("data updated  successfully")
  } catch (error) {
    res.status(500).send(error.message)
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
