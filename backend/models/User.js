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
  password: {
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
    healthInsurance: [{
        //output
        //premium, agency, cover, cashless hospitals : num, diseases covered : []
    }],
    homeLoan : [{
        // inputs : 
        // outputs : processing fee, interest rate, EMI, name
    }],
    travelInsurance: [{
      input: {
        destination: {
          type: String
        }
      },
      output: {

      }
    }],
    fd: [{
      output: {
        name: {
          type: String
        },
        type: {
          type: String
        },
        interest: {
          type: Number
        },
        interestRate: {
          type: Number
        },
        slab: {
          type: String
        },
        policy: {
          type: String
        }
      },
      input: {
        principal: {
          type: Number
        },
        totalTenure: {
          type: Number
        },
        cumulative: {
          type: Boolean
        },
        nonCumulative: {
          type: Boolean
        },
        monthly: {
          type: Boolean
        },
        quarterly: {
          type: Boolean
        },
        semiAnnually: {
          type: Boolean
        }
      }
    }]
  }
}, { timestamp: true })

module.exports = mongoose.model('users', UserSchema)
