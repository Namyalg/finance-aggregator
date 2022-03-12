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
            console.log(`statusCode: ${res.status}`);
            loans = res.data.message;
        })
        .catch((error) => {
            console.error(error);
        });
    console.log(loans.length, " loans returned");
    res.render("personal-loan", { loans: loans, emi: [] });
});

router.post("/query", async(req, res) => {
    var eligibleLoans = [];
    var emis = [];
    var loanAmount = req.body.amount;
    var tenure = req.body.tenure;
    var interestRate = req.body["interest-rate"];
    var age = req.body.age;
    var employment = req.body.employment;
    var income = req.body.income;
    console.log(interestRate);

    queryParams = {}
    await axios
        .post(
            backendURL + "/query", {
                amount: loanAmount,
                tenure: Math.round(tenure)
            }, {
                params: {
                    amount: loanAmount,
                },
            }
        )
        .then((res) => {
            console.log(`statusCode: ${res.status}`);
            eligibleLoans = res.data.message;
        })
        .catch((error) => {
            console.error(error);
        });

    eligibleLoans.forEach((loan) => {
        if (!interestRate) interestRate = loan["interest"]["general"]["range_from"];
        console.log(loanAmount, tenure, interestRate);
        emis.push(
            calcluateEMI(
                parseFloat(loanAmount),
                parseFloat(tenure),
                parseFloat(interestRate)
            )
        );
    });
    res.render("personal-loan", {
        loans: eligibleLoans,
        emi: emis,
        amount: loanAmount,
        tenure: tenure,
        interestRate: interestRate
    });
});

module.exports = router;