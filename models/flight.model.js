const mongoose = require("mongoose");

 var flightSchema = new mongoose.Schema(
    {
        flightId : {
            type : Number,
            required : true
        },
        flightName : {
            type : String,
            required : true
        },
        source : {
            type : String,
            required : true
        },
        destination : {
            type : String,
            required : true
        },
        journeyDateTime : {
            type : Date,
            required : true
        }
    }
 )

 const Flights = mongoose.model('Flights',flightSchema);
 module.exports = Flights;
 