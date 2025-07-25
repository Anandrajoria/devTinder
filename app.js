const express = require("express");
const app = express();
const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


const authRouter = require('./src/routes/auth')
const profileRouter = require('./src/routes/profile')
const requestRouter = require('./src/routes/request')


app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)



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
