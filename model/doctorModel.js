const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    specialization: String,
    experience: Number,
    location: String,
    date: Date,
    slots: Number,
    fee: Number
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = {Appointment};
