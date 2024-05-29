const Service = require('../models/service');

const serviceController = {
  // to create a new service
  createService: async (req, res) => {
    try {
      const { name, category, price, description } = req.body;
      console.log('Creating service with data:', { name, category, price, description });

      const newService = new Service({ name, category, price, description });
      await newService.save();

      res.status(201).json({ message: 'Service created', data: newService });
    } catch (error) {
      console.error('Error creating service:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Controller to get all services
  getAllServices: async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json({ success: true, data: services });
    } catch (error) {
      console.error('Error fetching services:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = serviceController;
