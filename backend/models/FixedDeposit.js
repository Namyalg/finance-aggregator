/* This file consists of the schema for each user
    On creation a mongo db document with this schema is created
    The name of the collection is examples
*/

/*
  The schema will have name of the bank
  Then one thing called below 2 crore -> normal and senior
  Then 2 to 5 cr and both general and senior
*/

const mongoose = require('mongoose')

const BankSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  under_two_cr: [
    {
      period: {
        type: String,
        required: true
      },
      general: {
        type: Number,
        required: true
      },
      senior: {
        type: Number,
        required: true
      }
    }
  ],
  two_five_cr: [
    {
      period: {
        type: String,
        required: true
      },
      general: {
        type: Number,
        required: true
      },
      senior: {
        type: Number,
        required: true
      }
    }
  ]
}, { timestamp: true })

module.exports = mongoose.model('fixed_deposits', BankSchema)
