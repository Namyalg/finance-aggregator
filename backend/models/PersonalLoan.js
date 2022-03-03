const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    Bank: {
        type: String,
        required: true
    },
    "Age Limit": {
        type: String,
        required: true
    },
    "Minimum Work Experience": {
        type: String
    },
    "Minimum Income (Per Month)": {
        type: String
    }
}, { timestamp: true })

module.exports = mongoose.model('personal_loan', Schema)