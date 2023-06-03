const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema ({

    _id : {
        type : String,
        required : true
    },
    seq : {
        type : Number,
        required : true,
        default : 0
    }
})


const counters = mongoose.model('counters',counterSchema);
module.exports = counters;
