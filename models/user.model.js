const mongoose = require("mongoose");

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
