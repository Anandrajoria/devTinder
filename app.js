const express = require("express");
const app = express();


// we can wrap routes inside array
// !  app.use('/route',r1,[r2,r3],r4,r5)
app.use("/user", [
  (req, res, next) => {
    // route handler
    console.log("handleig the route");
    // res.send("route handler 1");
    next();
  },
  (req, res, next) => {
    console.log("handling 2nd route");
    // res.send("route handler 2");
    next();
  }],
  (req, res, next) => {
    console.log("handling 3rd route");
    // res.send("route handeler 3");
    next()
  },
  (req, res, next) => {
    console.log("handling 4th route");
    res.send("route handeler 4");
    // next();
  },
);

app.listen(7777, () => {
  console.log("server is running ");
});
