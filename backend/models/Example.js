/* 
    This file consists of the schema for each user
    On creation a mongo db document with this schema is created
    The name of the collection is examples
*/

const mongoose = require('mongoose')

const ExampleSchema = mongoose.Schema({
    //serves as the primary key
    email : {
        type : String,
        required : true
    },
    age : { 
        type : Number,
        required : true
    }
}, {timestamp : true})

module.exports = mongoose.model('examples', ExampleSchema)