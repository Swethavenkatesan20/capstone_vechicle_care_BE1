const express = require('express');
const serviceController = require('../controllers/serviceControllers');
const auth = require('../middleware/auth');
const serviceRouter = express.Router();

// Route to create a new service (requires authentication)
serviceRouter.post('/', auth.verifyToken,serviceController.createService);

// Route to get all services (requires authentication)
serviceRouter.get('/', auth.verifyToken, serviceController.getAllServices);

module.exports = serviceRouter;
