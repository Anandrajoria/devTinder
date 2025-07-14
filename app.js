const express = require("express");
const app = express();


// conditional route handling

app.get('/check/:age',(req,res,getGo)=>{
  const age=parseInt(req.params.age)
  if(age>=18){
    console.log('adult');
    getGo()
  }else{
    res.send('you are underage')
  }
},(req,res)=>{
  res.send("welcome adult user")
}
)


//! error handler

/**
 When a user visits /error, this route runs.

It creates a new Error object with the message "Something went wrong".

Instead of sending a normal response, it calls next(err):

This passes the error to the error handling middleware.

Express skips all remaining normal middleware and goes directly to error handling middleware.
 */
app.get("/error", (req, res, next) => {
  const err = new Error("Something went wrong");
  next(err); // pass error to error handler
});

app.use((err,req,res,next)=>{
  console.error(err.message);
  res.status(500).send("internal server error:"+err.message)
})

app.listen(7777, () => {
  console.log("server is running ");
});
