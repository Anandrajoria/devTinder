const express = require("express");
const app = express();

/*
! order of the routes matter 
longer routes saparated by / must me put at top of routes and 
wild card must stay at last
*/

// ! dynamic routing

app.get("/user/:userid/:bookid", (req, res) => {
  const { userid, bookid } = req.params;
  res.send(`User ID requested is ${userid} with book id ${bookid}`);
});



// optional routing doesn't work in express_5 
app.get("/user2/:userid", (req, res) => {
  res.send(`user id is ${req.params.userid}`);
});

app.get("/user2", (req, res) => {
  res.send("user id is not provided");
});



app.listen(7777, () => {
  console.log("server is running ");
});
