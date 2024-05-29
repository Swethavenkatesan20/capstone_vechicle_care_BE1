const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

reviewRouter.post('/', auth.verifyToken, reviewController.createReview);
reviewRouter.get('/', reviewController.getAllReviews);

module.exports = reviewRouter;


