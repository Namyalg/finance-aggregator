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
    personalLoan: [{
      input: {
        amount: {
          type: Number
        },
        term: {
          type: Number
        },
        interest: {
          type: Number
        },
        filter: {
          type: String
        }
      },
      output: {
        amount: {
          type: Number
        }
      }
    }],
    healthInsurance: [{
      input: {
        noOfPeople: {
          type: Number
        },
        noOfDiseases: {
          type: Number
        },
        age: {
          type: Number
        },
        criteria: {
          type: Number
        }
      },
      output: {
        premium: {
          type: Number
        },
        agency: {
          type: String
        },
        cover: {
          type: Number
        },
        cashless_hospitals: {
          type: Number
        },
        diseases: [{
          type: String
        }]
      }
      // output
      // premium, agency, cover, cashless hospitals : num, diseases covered : []
    }],
    homeLoan: [{
      input: {
        amount: {
          type: Number
        },
        tenure: {
          type: Number
        },
        age: {
          type: Number
        },
        employment_type: {
          type: String
        },
        rate_packages: {
          type: String
        },
        income: {
          type: Number
        },
        gender: {
          type: String
        }
      },
      output: {
        interest: {
          type: Number
        },
        emi: {
          type: Number
        },
        processing_fee: {
          type: Number
        }
      }
      // inputs :
      // outputs : processing fee, interest rate, EMI, name
    }],
    travelInsurance: [{
      output: {
        agency_name: {
          type: String
        },
        product_name: {
          type: String
        },
        destination: {
          type: String
        },
        premium: {
          type: Number
        },
        duration: {
          type: String
        }
      },
      input: {
        destination: {
          type: String
        }
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
