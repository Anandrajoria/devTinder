const express = require("express");
const app = express();

const { adminAuth,userAuth } = require("./src/middleware/auth");
app.use("/admin",adminAuth);
app.use('/user/login',(req,res)=>{
  res.send("user loggend in suuessfully")
})
app.use ("/user", userAuth,(req, res) => {
  res.send("user data sent");
});
app.get("/admin/getAllData", (req, res) => {
  res.send("all data sent");
});
app.get("/admin/delAUser", (req, res) => {
  res.send("deleted a user");
});


app.listen(7777, () => {
  console.log("server is running ");
});
