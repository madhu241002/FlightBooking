const mongoose = require("mongoose");
// const uri = "mongodb+srv://gadeutham2000:gadeutham2000@cluster0.gyt1xbr.mongodb.net/FlightBooking?retryWrites=true&w=majority";
// mongoose.connect(uri).then(() => {
//     console.log('connected succeded to database');
// }).catch((error) => {
//     console.log("error occured in connecting to db" + error)
// })

 var userSchema = new mongoose.Schema(
    {
        userId : {
            type : Number,
            required : true
        },
        name : {
            type :String,
            required : [true,"name is missing"]
        },
        email : {
            type : String,
            required : [true,"email is required"]
        },
        password : {
            type : String,
            required :[true, "password is required"]
        },
        role : {
            type : String,
            enum : ["admin","user"]
        }
    }
 )

const Users = mongoose.model('Users',userSchema);
module.exports = Users;

// const user1 = new Users({
//     userId : 1,
//     name : "Utham",
//     email : "gade.utham.2000@gmail.com",
//     password : "random",
//     role : "user"
// });
  
// user1.save();