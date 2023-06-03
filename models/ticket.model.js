const mongoose = require("mongoose");

 var ticketSchema = new mongoose.Schema(
    {
        ticketId : {
            type : Number,
            required : true
        },
        flightId : {
            type : Number,
            required : true
        },
        userId : {
            type : Number,
            required : true
        },
        fare : {
            type : Number,
            required : true
        },
        active : {
            type : Number,
            required : true
        }
    }
 )

 const Tickets = mongoose.model('Tickets',ticketSchema);
 module.exports = Tickets;
 