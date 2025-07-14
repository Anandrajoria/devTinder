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


app.listen(7777, () => {
  console.log("server is running ");
});
