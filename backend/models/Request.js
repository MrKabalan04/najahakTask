const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Done'],
    default: 'New',
  },
}, { timestamps: true })

module.exports = mongoose.model('Request', requestSchema)