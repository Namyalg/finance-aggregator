var express = require("express");
const axios = require("axios");
var router = express.Router();

var backendURL = "http://localhost:9001/personalLoan";

function calcluateEMI(principal, tenure, rate) {
    rate = rate / 100 / 12;
    tenure = tenure * 12;
    return (
        (principal * rate * Math.pow(rate + 1, tenure)) /
        (Math.pow(rate + 1, tenure) - 1)
    ).toFixed(2);
}

router.get("/", async(req, res) => {
    var loans = [];
    await axios
        .get(backendURL)
        .then((res) => {
            loans = res.data.message;
        })
        .catch((error) => {
            console.error(error);
        });
    res.render("personal-loan", { loans: loans, emi: [] });
});

router.post("/query", async(req, res) => {
    console.log(req.body)
    var eligibleLoans = [];
    var emis = [];
    var loanAmount = req.body.amount;
    var tenure = req.body.tenure;
    var interestRate = req.body["interest-rate"];
    var age = req.body.age;
    var employment = req.body.employment;
    var income = req.body.income;

    queryParams = {
        amount: loanAmount,
        tenure: Math.round(tenure)
    }
    if (interestRate) {
        queryParams["interest"] = interestRate
    }
    if (age) {
        queryParams["age"] = age
    }
    if (employment) {
        queryParams["employment"] = employment
    }
    if (income) {
        queryParams["income"] = income
    }
    if (req.body.filters) {
        if (req.body.filters != "emi")
            queryParams["sector"] = req.body.filters
    }
    await axios
        .post(
            backendURL + "/query", queryParams
        )
        .then((res) => {
            eligibleLoans = res.data.message;
        })
        .catch((error) => {
            console.error(error);
        });

    eligibleLoans.forEach((loan) => {
        var rate
        if (!interestRate) rate = loan["interest"]["general"]["range_from"];
        else rate = interestRate
        loan.emi = calcluateEMI(
            parseFloat(loanAmount),
            parseFloat(tenure),
            parseFloat(rate)
        )
        emis.push(
            calcluateEMI(
                parseFloat(loanAmount),
                parseFloat(tenure),
                parseFloat(rate)
            )
        );
    });
    if (req.body.filters = "emi") {
        console.log(eligibleLoans)
        eligibleLoans.sort(function(a, b) {
            return a.emi - b.emi
        })
    }
    res.render("personal-loan", {
        loans: eligibleLoans,
        emi: emis,
        amount: loanAmount,
        tenure: tenure,
        interestRate: interestRate,
        age: age,
        employ: employment,
        income: income
    });
});

module.exports = router;