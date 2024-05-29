const Appointment = require('../models/appointment');
const User = require('../models/user');
const Service = require('../models/service');

const express = require('express');
const mongoose = require('mongoose');

const appointmentController = {
  createAppointment: async (request, response) => {
    try {
      const { date, time } = request.body;
      console.log('Received appointment data:', request.body);

      if (!date || !time) {
        return response.status(400).json({ message: 'All fields are required' });
      }

      const newAppointment = new Appointment({ date, time, userId: request.userId });
      await newAppointment.save();

      response.status(201).json({ message: 'Appointment booked', data: newAppointment });
    } catch (error) {
      console.error('Error creating appointment:', error);
      response.status(500).json({ success: false, error: error.message });
    }
  },

  getAllAppointments: async (request, response) => {
    try {
      const appointments = await Appointment.find({ userId: request.userId });

      response.status(200).json({ success: true, data: appointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      response.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = appointmentController;
