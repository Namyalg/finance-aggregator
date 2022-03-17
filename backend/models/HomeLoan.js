const mongoose = require("mongoose");

const HomeLoanSchema = mongoose.Schema({
    Bank: {
        type: String,
        required: true,
    },
    starting_interest_rate: {
        type: Number,
        required: true,
    },
    processing_fee: {
        percent: {
            type: Number,
        },
        max: {
            type: Number,
        }
    },
    max_tenure: {
        type: Number,
        default: 50,
    },
    rate_packages_available: {
        fixed: {
            type: Boolean,
            default: false,
        },
        floating: {
            type: Boolean,
            default: false
        }
    },
    interest_factor: {
        salaried: {
            type: Number,
            default: 0,
        },
        self_employed: {
            type: Number,
            default: 0,
        },
        women: {
            type: Number,
            default: 0,
        },
        fixed: {
            type: Number,
            default: 0,
        },
        above30: {
            type: Number,
            default: 0,
        }
    },
    avg_approval_time: {
        type: Number,
        default: 0,
    },
    age_limit: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 0,
        }
    },
    loan_amount: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 0,
        }
    }
},
    { timestamp: true });

const Loans = mongoose.model("home_loan", HomeLoanSchema);
// Loans.insertMany([
//     //     { 
//     //     Bank: '', 
//     //     "starting_interest_rate": , 
//     //     "processing_fee": {
//     //         percent: ,
//     //         max: 
//     //     }, 
//     //     "max_tenure": ,
//     //     "rate_packages_available": {
//     //         fixed: ,
//     //         floating: ,
//     //     },
//     //     "interest_factor": {
//     //         salaried: ,
//     //         "self_employed": ,
//     //         women: ,
//     //         fixed: ,   
//     //     },
//     //     "average_approval_time": ,
//     //     "age_limit": {
//     //         min: ,
//     //         max: ,
//     //     },
//     //     "loan_amount": {
//     //         min: ,
//     //         max: 
//     //     }
//     // },

//     {
//         Bank: 'Kotak Mahindra Bank',
//         "starting_interest_rate": 6.55,
//         "processing_fee": {
//             percent: 0.5,
//             max: 0
//         },
//         "max_tenure": 20,
//         "rate_packages_available": {
//             floating: true,
//         },
//         "interest_factor": {
//             salaried: 0.17,
//             "self_employed": 0.27,
//             women: -0.3,
//             fixed: 0,
//             above30: 0,
//         },
//         "average_approval_time": 30,
//         "age_limit": {
//             min: 0,
//             max: 0,
//         },
//         "loan_amount": {
//             min: 0,
//             max: 0
//         }
//     },
//     {
//         Bank: 'CitiBank',
//         "starting_interest_rate": 6.75,
//         "processing_fee": {
//             percent: 0,
//             max: 5000
//         },
//         "max_tenure": 25,
//         "rate_packages_available": {
//             fixed: true,
//         },
//         "interest_factor": {
//             salaried: 0,
//             "self_employed": 0,
//             women: 0,
//             fixed: 3,
//             above30: 0.05,
//         },
//         "average_approval_time": 0,
//         "age_limit": {
//             min: 0,
//             max: 0,
//         },
//         "loan_amount": {
//             min: 0,
//             max: 0
//         }
//     },
//     {
//         Bank: 'Union Bank of India',
//         "starting_interest_rate": 6.6,
//         "processing_fee": {
//             percent: 0.5,
//             max: 0
//         },
//         "max_tenure": 30,
//         "rate_packages_available": {
//             floating: true,
//         },
//         "interest_factor": {
//             salaried: 0.2,
//             "self_employed": 0.2,
//             women: -0.2,
//             fixed: 0,
//             above30: 0.1,
//         },
//         "average_approval_time": 0,
//         "age_limit": {
//             min: 21,
//             max: 70,
//         },
//         "loan_amount": {
//             min: 0.25,
//             max: 0
//         }
//     },
//     {
//         Bank: 'Bank of Baroda',
//         "starting_interest_rate": 6.5,
//         "processing_fee": {
//             percent: 0.38,
//             max: 25000
//         },
//         "max_tenure": 30,
//         "rate_packages_available": {
//             fixed: false,
//             floating: true,
//         },
//         "interest_factor": {
//             salaried: 0.35,
//             "self_employed": 0.35,
//             women: 0,
//             fixed: 3,
//             above30: 0.08,
//         },
//         "average_approval_time": 0,
//         "age_limit": {
//             min: 21,
//             max: 70,
//         },
//         "loan_amount": {
//             min: 0.01,
//             max: 2
//         }
//     },
//     {
//         Bank: 'Central Bank of India',
//         "starting_interest_rate": 6.85,
//         "processing_fee": {
//             percent: 0.5,
//             max: 20000
//         },
//         "max_tenure": 30,
//         "rate_packages_available": {
//             floating: true,
//         },
//         "interest_factor": {
//             salaried: 0.15,
//             "self_employed": 0.25,
//             women: 0,
//             fixed: 3,
//             above30: 0.15,
//         },
//         "average_approval_time": 0,
//         "age_limit": {
//             min: 18,
//             max: 70,
//         },
//         "loan_amount": {
//             min: 0.2,
//             max: 0.75
//         }
//     },
//     {
//         Bank: 'Bank of India',
//         "starting_interest_rate": 6.85,
//         "processing_fee": {
//             percent: 0.25,
//             max: 18500
//         },
//         "max_tenure": 30,
//         "rate_packages_available": {
//             fixed: true,
//             floating: true,
//         },
//         "interest_factor": {
//             salaried: 0.1,
//             "self_employed": 0.3,
//             women: -0.5,
//             fixed: 4,
//             above30: 0.12,
//         },
//         "average_approval_time": 0,
//         "age_limit": {
//             min: 18,
//             max: 0,
//         },
//         "loan_amount": {
//             min: 0,
//             max: 5
//         }
//     },
//     {
//         Bank: 'State Bank of India',
//         "starting_interest_rate": 6.8,
//         "processing_fee": {
//             percent: 0.4,
//             max: 30000
//         },
//         "max_tenure": 30,
//         "rate_packages_available": {
//             fixed: false,
//             floating: true,
//         },
//         "interest_factor": {
//             salaried: 0.2,
//             "self_employed": 0.5,
//             women: -0.2,
//             fixed: 0,
//             above30: 0.4,
//         },
//         "average_approval_time": 22,
//         "age_limit": {
//             min: 18,
//             max: 70,
//         },
//         "loan_amount": {
//             min: 0,
//             max: 0
//         }
//     },
//     {
//         Bank: 'Axis Bank',
//         "starting_interest_rate": 6.9,
//         "processing_fee": {
//             percent: 1,
//             max: 25200
//         },
//         "max_tenure": 30,
//         "rate_packages_available": {
//             fixed: true,
//             floating: true,
//         },
//         "interest_factor": {
//             salaried: 0.6,
//             "self_employed": 1,
//             women: -0.3,
//             fixed: 3.5,
//         },
//         "average_approval_time": 15,
//         "age_limit": {
//             min: 21,
//             max: 57,
//         },
//         "loan_amount": {
//             min: 0.05,
//             max: 10
//         }
//     },
//     {
//         Bank: 'Canara Bank',
//         "starting_interest_rate": 6.9,
//         "processing_fee": {
//             percent: 0.5,
//             max: 15000
//         },
//         "max_tenure": 30,
//         "rate_packages_available": {
//             fixed: false,
//             floating: true,
//         },
//         "interest_factor": {
//             salaried: 0.9,
//             "self_employed": 1.5,
//             women: 0,
//             fixed: 0,
//             above30: 0.11,
//         },
//         "average_approval_time": 0,
//         "age_limit": {
//             min: 21,
//             max: 70,
//         },
//         "loan_amount": {
//             min: 0,
//             max: 0
//         }
//     },
//     {
//         Bank: 'LIC housing finance',
//         "starting_interest_rate": 6.9,
//         "processing_fee": {
//             percent: 0,
//             max: 10000
//         },
//         "max_tenure": 30,
//         "rate_packages_available": {
//             fixed: false,
//             floating: true,
//         },
//         "interest_factor": {
//             salaried: 0.7,
//             "self_employed": 0.9,
//             women: 0,
//             fixed: 0,
//             above30: 0.03,
//         },
//         "average_approval_time": 8,
//         "age_limit": {
//             min: 20,
//             max: 60,
//         },
//         "loan_amount": {
//             min: 0.3,
//             max: 5
//         }
//     },
// ]).then(data => console.log(data));
module.exports = Loans;