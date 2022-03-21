const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  agency_name: { type: String },
  agency_type: { type: String },
  product_name: { type: String },
  destination: { type: String },
  premium: { type: Number },
  duration: { type: String }
}, { timestamp: true })

module.exports = mongoose.model('travel_insurance', Schema)
