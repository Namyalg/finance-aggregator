/* This file consists of the schema for each user
    On creation a mongo db document with this schema is created
    The name of the collection is examples
*/

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bookmarks: {
        loan: [{
            type: String,
            required: true
        }],
        insurance: [{
            type: String,
            required: true
        }],
        fd: [{
            type: String,
            required: true
        }]
    }
}, { timestamp: true })

module.exports = mongoose.model('users', UserSchema)