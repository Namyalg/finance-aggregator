const mongoose = require("mongoose");

const Schema = mongoose.Schema({
   agency: {
       type: String,
       require: true
   },
   premium: {
        type: Number,
        require: true
   },
   cover: {
        type: Number,
        require: true
   },
   cashless_hospitals: {
        type: Number,
        require: true
   },
   dieases: {
        type: [String],
        required: true
   }
}, { timestamp: true });

module.exports = mongoose.model("health_insurance", Schema);