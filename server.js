const express = require('express');
const app = new express();
const portno = 3000;
const UserRouter = require('./Routes/User');
const AdminRouter = require('./Routes/Admin');
const Users = require('./models/user.model');
const counters = require('./models/counters.models');


const mongoose = require('mongoose');
const uri = "mongodb+srv://madhuramm2410:madhuramm2410@cluster0.mr7r0zj.mongodb.net/FlightBooking?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
  console.log('connected successfully to database');
  app.listen(portno,()=>{
      console.log(`Server is running on port no ${portno}`);
  });
}).catch((error) => {
  console.log("error occured in connecting to db" + error)
})


app.use(express.urlencoded());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello !! Welcome to Flight Booking System')
})

app.use('/Users',UserRouter)
app.use('/Admin',AdminRouter)

app.post('/SignUp',async (req, res) => {
  
  var user = new Users();
  user.userId = await getNextSequence("users");
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role ? req.body.role : "user";
  
  console.log(user);

  if (user.password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  try {
    await Users.create(user).then(user =>
      res.status(200).json({
        message: "User successfully created/ User details updated",
        user,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: "User creation failed",
      error: err.message,
    })
  }
})

app.post('/Login',async (req, res) => {
  try {
    const user = await Users.findOne({ email : req.body.email, password : req.body.password }).exec()
    if (!user) {
      res.status(401).json({
        message: "Login is Unsuccessful",
        error: "User not found",
      })
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Operation Failed. An error occurred",
      error: error.message,
    })
  }
})



async function getNextSequence(name) {
  const ret = await counters.findOneAndUpdate({_id: name}, {$inc: { seq: 1} }, {new: true, upsert: true});
  var all = await counters.find();
  console.log(all);
  return ret.seq;
}
