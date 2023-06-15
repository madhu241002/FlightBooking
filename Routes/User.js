const Router  = require("express").Router();
const UserController = require('../controllers/UserController');
const TicketController = require('../controllers/TicketController');
const FlightController = require('../controllers/FlightController');

Router.get('/', UserController.GetAllUsers)

Router.get('/GetUserById/:id', UserController.GetUserById)

Router.put('/UpdateDetails',UserController.UpdateUserDetails)

Router.post('/CreateTicket',TicketController.CreateTicket)

Router.put('/CancelTicket/:ticketId',TicketController.CancelTicket)

Router.get('/GetMyBookings/:userId',TicketController.GetBookingsByUserId)

Router.get('/GetFlights/:date',FlightController.GetFlightsOnDate)

Router.get('/GetFlightsInDateRange',FlightController.GetFlightsInDateRange)

module.exports = Router