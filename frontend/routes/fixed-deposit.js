let express = require('express');
let axios = require('axios')
let router = express.Router();
let backendURL = "http://localhost:9001/fd";

router.get('/', async (req, res) => {
    var result = []
    let queryParams = {
        valid: true,
        principal: 1000,
        totalTenure: 7,
        isSenior: false,
        cumulative: true,
        nonCumulative: false,
        monthly: false,
        semiAnnually: false,
        quarterly: false,
        filters: 'interestRate'
    }
    await axios
        .post(
            backendURL + "/", queryParams
        )
        .then((res) => {
            result = res.data.message;
        })
        .catch((error) => {
            console.error(error);
    });
    res.render("fixed-deposit", {
        result : result, input : queryParams  
    });
})

router.post("/", async(req, res) => {
    console.log("params are ")
    console.log(req.body)
    let result = []
    let queryParams = parseInput(req)
    await axios
        .post(
            backendURL + "/", queryParams
        )
        .then((res) => {
            result = res.data.message;
        })
        .catch((error) => {
            console.error(error);
        });
    console.log("sending to frontend ")
    console.log(result)
    res.render("fixed-deposit", {
        result : result, input: queryParams     
    });
});

function parseInput (req){
    let valid = false
    let principal, totalTenure, isSenior = false, cumulative = false, nonCumulative = false, monthly = false, quarterly = false, semiAnnually = false
    principal = parseInt(req.body.principal)
    let filters = ""
    totalTenure = tenureInDays(parseInt(req.body.years), parseInt(req.body.months), parseInt(req.body.days))
    if (req.body.senior !==  undefined){
        senior = true
    }
    if(req.body.interestType === 'cumulative'){
        cumulative = true
    }   
    else {
        nonCumulative = true 
        if(req.body.frequency === 'monthly'){
            monthly = true
        }
        else if (req.body.frequency === 'quarterly'){
            quarterly = true
        } 
        else {
            semiAnnually = true
        }
    }
    
    if(principal < 1000 || principal > 50000000){
        valid = false
    }

    else if(totalTenure < 7 || totalTenure > 3650){
        valid  = false
    }

    else if(!cumulative && !nonCumulative){
       valid = false
    }
    
    else if(nonCumulative && !monthly && !quarterly && !semiAnnually){
        valid = false
    }
    let inputs = {
        valid: true,
        principal: principal,
        totalTenure: totalTenure,
        isSenior: isSenior,
        cumulative: cumulative,
        nonCumulative: nonCumulative,
        monthly: monthly,
        semiAnnually: semiAnnually,
        quarterly: quarterly,
        filters : req.body.filters
    }
    return inputs
}

function tenureInDays(years, months, days){
    return 365 * years + 30 * months + days
}

module.exports = router;