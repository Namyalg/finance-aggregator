var express = require('express');
var router = express.Router();
const axios = require("axios");

function calculateEMI(interest, tenure, amount) {
    interest = interest / 12;
    interest = interest / 100;
    tenure = tenure * 12;
    ans = amount * interest * Math.pow(interest + 1, tenure);
    ans = ans / (Math.pow(interest + 1, tenure) - 1);
    return ans.toFixed(2);
}
function calculateInterest(loan, rate_packages, gender, employment_type) {
    res = loan.starting_interest_rate;
    if (rate_packages === "fixed")
        res += loan.interest_factor.fixed;
    if (gender === "female") res += loan.interest_factor.women;
    if (employment_type === "salaried") res += loan.interest_factor.salaried;
    else res += loan.interest_factor.self_employed;
    if (loan.amount > 3000000) res += loan.interest_factor.above30;
    return res.toFixed(2);
}
function calculateProcessingFee(amount, percent, max_val) {
    res = 0;
    if (percent) res = amount * percent;
    if (max_val && res > max_val) res = max_val;
    return res.toFixed(2);
}
var backendURL = "http://localhost:9001/homeLoan";
router.get('/', async (req, res) => {
    var loans = [];
    var computedLoans = [];
    var msg = "";
    await axios
        .get(backendURL)
        .then((res) => {
            console.log(`statusCode: ${res.status}`);
            loans = res.data.message;
        })
        .catch((error) => {
            console.error(error);
        });
        let input = {
            amount : 1000,
            tenure: 2,
            age: 23,
            employment_type: "salaried",
            rate_packages: "fixed",
            income: 100000,
            gender: "female"
    }
    res.render('home-loan', { loans: loans, computedLoans, msg, input: input });
})

router.post("/", async (req, res) => {
    var loans = [];
    var computedLoans = []
    var amount = req.body.amount;
    var tenure = req.body.tenure;
    var age = req.body.age;
    var employment_type = req.body.employment_type;
    var gender = req.body.gender;
    var rate_packages = req.body.rate_packages;
    var income = req.body.income;
    console.log(rate_packages);
    console.log(amount);
    await axios
        .post(
            backendURL, {
            amount: amount,
            tenure: tenure,
            age: age,
            rate_packages: rate_packages,
        })
        .then((res) => {
            console.log(`statusCode: ${res.status}`);
            loans = res.data.message;
        })
        .catch((error) => {
            console.error(error);
        });
    loans.forEach((loan, i) => {
        var netInterest = calculateInterest(loan, rate_packages, gender, employment_type);
        var emi = calculateEMI(netInterest, tenure, amount);
        var processing_fee = calculateProcessingFee(amount, loan.processing_fee.percent, loan.processing_fee.max);
        var x = {
            interest: netInterest,
            emi: emi,
            processing_fee: processing_fee,
            index: i
        }
        console.log(emi + " " + income);
        if (emi <= 0.4 * income)
            computedLoans.push(x);

    });
    var msg = "";
    let input = {
        amount : amount,
        tenure: tenure,
        age: age,
        employment_type: employment_type,
        rate_packages: rate_packages,
        income: income,
        gender: gender
    }
    console.log(computedLoans.length);
    if (!loans.length) msg = "Sorry, no offers for the given input available at the moment!!";
    else if (!computedLoans.length) msg = "Sorry, your income is not sufficient to acquire the loan. Please either increase the tenure or decrease the amount."
    computedLoans.sort(function (a, b) { return a.interest - b.interest });
    res.render('home-loan', { loans, computedLoans, amount, tenure, age, employment_type, rate_packages, msg, income, input: input });
})

module.exports = router;