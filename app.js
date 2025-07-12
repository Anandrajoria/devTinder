const express = require("express");
const app = express();

app.use("/rest",(req, res) => {
  res.send("hello from the server");
});
app.listen(3000, () => {
  console.log("server is running ");
});
