/* This file consists of the schema for the logs
    The document id will be logged along with the date and time
*/

const mongoose = require('mongoose')

const LogSchema = mongoose.Schema({
  policy: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, { timestamp: true })

module.exports = mongoose.model('logs', LogSchema)
