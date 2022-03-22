/* This file consists of the schema for the logs
    The document id will be logged along with the date and time
*/

const mongoose = require('mongoose')

const LogSchema = mongoose.Schema({
  healthInsurance: [{
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
  }],
  fixedDeposit: [{
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
  }],
  homeLoan: [{
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
  }],
  personalLoan: [{
    amount: {
      type: Number
    },
    tenure: {
      type: Number
    },
    interest: {
      type: Number
    },
    sector: {
      type: String
    }
  }],
  travelInsurance: [{
    sortBy: {
      type: String
    },
    destination: {
      type: String
    }
  }]
}, { timestamp: true })

module.exports = mongoose.model('logs', LogSchema)
