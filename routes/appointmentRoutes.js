const express = require('express');
const appointmentController = require('../controllers/appointmentControllers');
const auth = require('../middleware/auth');
const appointmentRouter = express.Router();

// Route to create a new appointment
appointmentRouter.post('/', auth.verifyToken, appointmentController.createAppointment);

// Route to get all appointments (requires authentication, only admin can see all the appointments)
appointmentRouter.get('/', auth.verifyToken,  appointmentController.getAllAppointments);

module.exports = appointmentRouter;
