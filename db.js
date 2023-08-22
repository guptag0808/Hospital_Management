const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb+srv://saurabh:saurabh@cluster0.hovcp.mongodb.net/Hospital_Management?retryWrites=true&w=majority')

module.exports ={connection}