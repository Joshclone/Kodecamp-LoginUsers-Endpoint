// jshint esversion: 6
require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/loginusersRoute.js");
const app = express()
const mongoose = require("mongoose");

//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(setUser); 


// MIDDLEWARES
app.use(express.json());

//Login users-Route
app.use("/", userRoute);
//setUser Function for login
function setUser(req, res, next)
{
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}



//IMPORT MONGOOSE-----------------------------------------------------------------

const url = `mongodb://localhost:27017/config`;
// connect to mongoose

mongoose.connect(url, function (err) { 
  if (err) { console.log(err); }
  console.log(`Connected to MongoDB`);
});

// -----------------------------------------------------------------


const port = 5000 || process.env.PORT
app.listen(port,()=>{
    console.log(`server is listening at ${port}`)
})