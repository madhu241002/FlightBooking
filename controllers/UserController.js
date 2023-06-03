const Users = require('../models/user.model');

exports.GetAllUsers = async (req, res) => {
    try {
        console.log("GetAllUsers");
        const users = await Users.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} 
exports.GetUserById = async (req, res) =>{
    try {
        console.log("GetuserById");
        const {id} = req.params;
        const user = await Users.find({userId : id }).exec();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.UpdateUserDetails = async (req, res) => {
    
    try {      
        await Users.findOneAndUpdate({ userId : req.body.userId}, 
        { $set : { name : req.body.name,
                   email : req.body.email,
                   password : req.body.password,
                   role : req.body.role   
                  }
         } , {new: true}).then(user =>
        res.status(200).json({
          message: "User details updated",
          user,
        })
      )
    } catch (err) {
      res.status(401).json({
        message: "User not found / User details not updated",
        error: err.message,
      })
    }
}

exports.DeleteUser = async (req, res) => {
    
    var role = req.body.role;
    if(role === "admin"){
        try {      
            var user = await Users.deleteOne({ userId : req.body.userId}).then(user =>
            res.status(200).json({
              message: "User deleted",
              user,
            })
          )
        } catch (err) {
          res.status(401).json({
            message: "User not found / User not deleted",
            error: err.message,
          })
        }
    }
    else{
        res.status(403).json({
            message : "Not authorised to do this operation / Invalid Operation"
        })
    }
   
}

// module.exports = UserController
