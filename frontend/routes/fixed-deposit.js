let express = require('express');
let axios = require('axios')
let router = express.Router();
let backendURL = "http://localhost:9001/fd";

router.get('/', (req, res) => {
    res.render('fixed-deposit', {status : 1, result : [1,2,4]});
})

router.post("/", async(req, res) => {
    let queryParams = parseInput(req)
    await axios
        .post(
            backendURL + "/", queryParams
        )
        .then((res) => {
            eligibleLoans = res.data.message;
        })
        .catch((error) => {
            console.error(error);
        });

    eligibleLoans.forEach((loan) => {
       console.log(loan)
    });
    res.render("fixed-deposit", {
        result : [1,3,4]        
    });
});

// router.post('/', (req, res) => {
    

//     res.render('fixed-deposit', {result : [1,23]});
// })

function parseInput (req){
    let valid = false
    let principal, totalTenure, isSenior = false, cumulative = false, nonCumulative = false, monthly = false, quarterly = false, semiAnnually = false
    principal = parseInt(req.body.principal)
    totalTenure = tenureInDays(parseInt(req.body.years), parseInt(req.body.months), parseInt(req.body.days))
    console.log("In parse Input ")
    console.log("checking the inputs and tenure is ")
    console.log(typeof(totalTenure))
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
        quarterly: quarterly
    }
    return inputs
}

function tenureInDays(years, months, days){
    console.log("In tenuse days ")
    console.log(years, months, days)
    return 365 * years + 30 * months + days
}
module.exports = router;