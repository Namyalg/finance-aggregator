var express = require("express");
const axios = require("axios");
var router = express.Router();

var backendURL = "http://localhost:8800/travelInsurance";

function calcluateEMI(principal, tenure, rate) {
  rate = rate / 100 / 12;
  tenure = tenure * 12;
  return (
    (principal * rate * Math.pow(rate + 1, tenure)) /
    (Math.pow(rate + 1, tenure) - 1)
  ).toFixed(2);
}

router.get("/", async (req, res) => {
  var dest = [];
  await axios
    .get(backendURL + "/alldest")
    .then((res) => {
      dest = res.data.message;
    })
    .catch((error) => {
      console.error(error);
    });
  res.render("travel-insurance", { destinations: dest, loans: [], emi: [], insurances: [] });
});

router.post("/query", async (req, res) => {
  console.log(req.body);
  var queryDestination = req.body.destination;
  var dest = []; 

  await axios
    .get(backendURL + "/alldest")
    .then((res) => {
      dest = res.data.message;
    })
    .catch((error) => {
      console.error(error);
    });

  queryParams = {};
  if (queryDestination) {
    queryParams["destination"] = dest[queryDestination];
  }
  await axios
    .post(backendURL + "/query", queryParams)
    .then((res) => {
      eligibleInsurances = res.data.message;
    })
    .catch((error) => {
      console.error(error);
    });

  res.render("travel-insurance", {
    destinations: dest,
    loans: [],
    emi: [],
    insurances: eligibleInsurances,
  });
});

module.exports = router;
