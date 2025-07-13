const express = require("express");
const app = express();

/*
! order of the routes matter 
longer routes saparated by / must me put at top of routes and 
wild card must stay at last
*/

// this will only handle get call to /user
//? get request to get data from database
app.get("/user", (req, res) => {
  res.send({
    firstname: "adi",
    lastname: "pra",
  });
});

//? post request for adding the data to databse
app.post('/user',(req,res)=>{
  console.log("send data to server");
  res.send("data successfully saved to database")
  
})
//? delete for deleting the data from databse
app.delete('/user',(req,res)=>{
  console.log("data deleted from server");
  res.send("data successfully deleted form server")
})


//? put to  update or replace an entire resource.
app.put('/user', (req, res) => {
  console.log("data updated on server");
  res.send("data successfully updated on server");
});


// ? patch To partially update a resource (only specific fields).
app.patch('/user', (req, res) => {
  console.log("data partially updated on server");
  res.send("data partially updated on server");
})


//this will match aal the http method api call to /test
app.use("/test", (req, res) => {
  res.send("nameste aditya");
});

app.listen(7777, () => {
  console.log("server is running ");
});
