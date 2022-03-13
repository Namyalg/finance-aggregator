var express = require("express");
const axios = require("axios");
var router = express.Router();

var backendURL = "http://localhost:9001/healthInsurance";

router.get('/', async (req, res) => {
    var allInsurances = [];
    await axios
        .get(backendURL)
        .then((res) => {
            console.log(`statusCode: ${res.status}`);
            allInsurances = res.data.message;
        })
        .catch((error) => {
            console.error(error);
        });
    console.log(allInsurances.length, " insurances returned")
    res.render('health-insurance', {allInsurances : allInsurances});
})

module.exports = router;