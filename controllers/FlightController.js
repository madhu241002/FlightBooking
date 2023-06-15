const Flights = require('../models/flight.model');
const counters = require('../models/counters.models');

exports.GetFlights = async (req, res) => {
    try {
        const flights = await Flights.find({});
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} 

exports.GetFlightsOnDate = async (req, res) => {

    const {date} = req.params
    let endDate = date
    endDate = date + 'T23:59:59.000Z';


    try {
        const flights = await Flights.find({journeyDateTime: {$gte: date, $lte: endDate}});    
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} 

exports.GetFlightsInDateRange = async (req, res) => {

    const fromDate = req.query.fromDate;
    var toDate = req.query.toDate;
    toDate = toDate + 'T23:59:59.000Z';
    //find({ airedAt: { $gte: '1987-10-19', $lte: '1987-10-26' } })

    try {
        const flights = await Flights.find({ journeyDateTime: { $gte: new Date(fromDate), $lte: new Date(toDate) } });
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} 

exports.CreateFlight = async (req, res) => {
  
    var role = req.body.role;
    if(role === "admin")
    {
    
        var flight = new Flights();
        flight.flightId = await getNextSequence("flights");
        flight.flightName = req.body.flightName;
        flight.source = req.body.source;
        flight.destination = req.body.destination;
        flight.journeyDateTime = req.body.journeyDateTime;

        
        try {
            await Flights.create(flight).then(flight =>
                res.status(200).json({
                message: "Flight successfully created",
                flight,
                })
            )
        } 
        catch (err) {
            res.status(401).json({
                message: "Flight creation not successful ",
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

  
exports.UpdateFlightDetails = async (req, res) => {
    
    var role = req.body.role;
    if(role === "admin"){
        try {      
            await Flights.findOneAndUpdate({ flightId : req.body.flightId}, 
            { $set : { flightName : req.body.flightName,
                    source : req.body.source,
                    destination : req.body.destination,
                    journeyDateTime : req.body.journeyDateTime   
                    }
            } , {new: true}).then(flight =>
            res.status(200).json({
            message: "Flight details updated",
            flight,
            })
        )
        } catch (err) {
        res.status(401).json({
            message: "Flight not found / Flight details not updated",
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

exports.DeleteFlight = async (req, res) => {
    
    var role = req.body.role;
    if(role === "admin"){
        try {      
            await Flights.deleteOne({ flightId : req.body.flightId}).then(flight =>
            res.status(200).json({
              message: "Flight deleted",
              flight,
            })
          )
        } catch (err) {
          res.status(401).json({
            message: "Flight not found / Flight not deleted",
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

async function getNextSequence(name) {
    const ret = await counters.findOneAndUpdate({_id: name}, {$inc: { seq: 1} }, {new: true, upsert: true});
    return ret.seq;
  }