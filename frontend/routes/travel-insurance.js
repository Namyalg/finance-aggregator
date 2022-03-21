var express = require("express");
const axios = require("axios");
var router = express.Router();

var backendURL = "http://localhost:8800/travelInsurance";

router.get("/", async (req, res) => {
  var dest = [];
  var input = {};
  await axios
    .get(backendURL + "/alldest")
    .then((res) => {
      dest = res.data.message;
    })
    .catch((error) => {
      console.error(error);
    });
  res.render("travel-insurance", {
    destinations: dest,
    insurances: [],
    input: input,
  });
});

router.post("/query", async (req, res) => {
  console.log(req.body);
  var queryDestination = req.body.destination;
  var sortBy = req.body.sortBy;
  var dest = [];
  var eligibleInsurances = [];
  var input = {};

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
  if (sortBy) {
    queryParams["sortBy"] = sortBy;
  }
  await axios
    .post(backendURL + "/query", queryParams)
    .then((res) => {
      eligibleInsurances = res.data.message;
    })
    .catch((error) => {
      console.error(error);
    });

  input.destination = dest[queryDestination];

  res.render("travel-insurance", {
    destinations: dest,
    insurances: eligibleInsurances,
    input: input,
  });
});

module.exports = router;
