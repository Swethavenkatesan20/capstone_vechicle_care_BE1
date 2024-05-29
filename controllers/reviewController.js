const Review = require('../models/review');

const reviewController = {
  createReview: async (req, res) => {
    try {
      const { text } = req.body;
      const userId = req.userId;
      const newReview = new Review({ text, user: userId });
      await newReview.save();
      res.status(201).json({ message: 'Review created', data: newReview });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.find().populate('user', 'name');
      res.status(200).json({ success: true, data: reviews });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = reviewController;
