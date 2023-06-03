const Router  = require("express").Router();
const UserController = require('../controllers/UserController');
const TicketController = require('../controllers/TicketController');
const FlightController = require('../controllers/FlightController');

Router.delete('/DeleteUser',UserController.DeleteUser)

Router.get('/GetBookingsByFlight/:flightId',TicketController.GetBookingsByFlightId)

Router.get('/GetBookingsByFlightAndDate/:flightId/:date',TicketController.GetBookingsByFlightAndDate)

Router.post('/CreateFlight',FlightController.CreateFlight)

Router.get('/GetAllFlights',FlightController.GetFlights)

Router.get('/GetFlightsOnDate/:date',FlightController.GetFlightsOnDate)

Router.get('/GetFlightsInDateRange',FlightController.GetFlightsInDateRange)

Router.put('/UpdateFlightDetails',FlightController.UpdateFlightDetails)

Router.delete('/DeleteFlight',FlightController.DeleteFlight)

module.exports = Router;