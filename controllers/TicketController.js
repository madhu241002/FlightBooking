const Tickets = require('../models/ticket.model');
const Flights = require('../models/flight.model');
const counters = require('../models/counters.models');
const Users = require('../models/user.model');

exports.CreateTicket = async (req, res) => {
  
    var ticket = new Tickets();  
    ticket.flightId = req.body.flightId;
    ticket.userId = req.body.userId;
    ticket.fare = req.body.fare;
    ticket.active = req.body.active ? req.body.active : 1
    
    console.log(ticket);
    
    var checkUser = await Users.findOne({ userId : ticket.userId }).exec();
    if(checkUser === null || checkUser === undefined){
        res.status(401).json({
            message: "Invalid User. User not found"
            });
        return
    }

    var checkFlight = await Flights.findOne({ flightId : ticket.flightId }).exec();
    if(checkFlight === null || checkFlight === undefined){
        res.status(401).json({
            message: "Flight not found"
            });
        return
    }

    const count = await Tickets.where({flightId : ticket.flightId, active : 1}).count();
    if(count < 60){
        try{
            ticket.ticketId = await getNextSequence("tickets");
            await Tickets.create(ticket).then(ticket =>
                res.status(200).json({
                message: "Ticket successfully created",
                ticket,
                })
            )
            } catch (err) {
            res.status(401).json({
                message: "Ticket creation not successful ",
                error: err.message,
            })
            }
    }
    else{
        res.status(401).json({
            message: "Flight capacity is only 60 members. Flight is full"
            })
    }

  

}


  
exports.CancelTicket = async (req, res) => {
   
    var {ticketId} = req.params;
    
    try {      
        await Tickets.findOneAndUpdate({ ticketId : ticketId}, 
        { $set : { active : 0 }
        } , {new: true}).then(ticket =>
        res.status(200).json({
        message: "Ticket successfully cancelled",
        ticket,
        })
    )
    } catch (err) {
        res.status(401).json({
            message: "Ticket not found to be cancelled",
            error: err.message,
        })
    }
}

exports.GetBookingsByUserId = async (req, res) => {
    
    try {
        const {userId} = req.params;
        console.log(userId);
        const result = await Tickets.find({userId : userId , active : 1}).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.GetBookingsByFlightId = async (req, res) => {
    
    try {
        const {flightId} = req.params;
        const result = await Tickets.find({flightId : flightId , active : 1}).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.GetBookingsByFlightAndDate = async (req, res) => {
    var finalResult = [];
    try {
        const {flightId, date} = req.params;
        let endDate = date
        endDate = date + 'T23:59:59.000Z';
        
        const result = await Flights.find({journeyDateTime: {$gte: date, $lte: endDate},flightId : flightId});
        result.forEach( async function(doc){           
            var filteredTickets = await Tickets.find({flightId : doc.flightId,active : 1}).exec();
            console.log(filteredTickets);
            filteredTickets.forEach(function(ticket){
                finalResult.push(ticket);
            });
        });
        res.status(200).json(finalResult);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function getNextSequence(name) {
    const ret = await counters.findOneAndUpdate({_id: name}, {$inc: { seq: 1} }, {new: true, upsert: true});
    return ret.seq;
  }