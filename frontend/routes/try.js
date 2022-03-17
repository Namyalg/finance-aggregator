let express = require('express');
let axios = require('axios')
let router = express.Router();
let r = []
router.get('/', (req, res) => {
    res.render('fixed-deposit', {status : 1, result : [1,2,4]});
})

router.post('/', (req, res) => {
    console.log(req.body)
    var result = []
    //getResult().then(response => console.log(response));
    result = validateInput(filter=0, req)
    console.log("THE ACTUAL RESULT IS ")
    console.log(result)


    // //function getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter){
    //     let valid, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually
    //     let filter = 0
    //     [valid, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually] = parseInput(req)
    //     console.log("IS IT VALID " + true)
    //     console.log("The data from the database")
    //     axios.get("http://localhost:9001/fd")
    //     .then(response => {
    //         data = response.data
    //         let result = []
    //         result = recommendOptions(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
    //         console.log("GOT THIS AS A RESULT")
    //         console.log(result)
    //         r = result
    //         return result
    //     })
    //     .catch(error => {
    //         if (error.response) {
    //         //get HTTP error code
    //         console.log(error.reponse.status)
    //         return [error.reponse.status]
    //         } else {
    //         console.log(error.message)
    //         return [error.message]
    //         }
    // })

    res.render('fixed-deposit', {result : [1,23]});
})

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
        return [valid];
    }

    else if(totalTenure < 7 || totalTenure > 3650){
        return [valid];
    }

    else if(!cumulative && !nonCumulative){
        return [valid];
    }
    
    else if(nonCumulative && !monthly && !quarterly && !semiAnnually){
        return [valid];
    }
    console.log("all info is correct ")
    return [true, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually]
}

async function validateInput(filter=0, req){
    let valid, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually
    [valid, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually] = parseInput(req)
    r = await getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
    r.then(console.log("whyyyyyyyyyyyyy" + r))
    console.log("HERERERERE")
    console.log("GET DATA RETURs ")
    console.log(r)
    return r
    console.log("IS It VALUD " + valid)
    console.log("PLS WORK NOW")
    console.log("whats this " + getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter))
    var result =  []
    if(valid) 
        result =  getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
    
    console.log(result)
    return result  
}

//After input fields are validated, bank data is fetched via a GET request
function getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter){
    //function getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter){
    // let valid, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually
    // [valid, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually] = parseInput(req)
    
    console.log("The data from the database")
    axios.get("http://localhost:9001/fd")
    .then(response => {
        data = response.data
        let result = []
        result = recommendOptions(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
        console.log("GOT THIS AS A RESULT")
        console.log(result)
        r = result
        return result
    })
    .catch(error => {
        if (error.response) {
        //get HTTP error code
        console.log(error.reponse.status)
        return [error.reponse.status]
        } else {
        console.log(error.message)
        return [error.message]
        }
    })
};

//computation performed and choiced returned
function recommendOptions(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter){   
    //stores the resulting ordering of options
    var results = []
    var ret = []
    var info
    var bankDetails = {}
    var interest = 0.0
    var policy = ""
    let allBanks = data.message 
    for(bank of allBanks){
        // console.log(bank)
        bankDetails = {}
        console.log("just going now ")
        if(principal < 20000000){
            console.log("working ahh this is ")
            console.log("before goign interss t " + interest)
            console.log("before g policy is " + policy)
            // let a, b 
            // console.log(calculateInterest(bank.under_two_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually))
            info = calculateInterest(bank.under_two_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
            console.log("A IS " + info)
            // [interest, policy] = calculateInterest(bank.under_two_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
            // console.log("AFTER")
            // console.log(interest, policy)
        }
        else{
            info = calculateInterest(bank.two_five_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
        }
        console.log("Got data back, will add it now " )
        console.log([interest, policy])
        interest = info[0]
        policy = info[1]
        console.log(bankDetails)
        bankDetails["name"] = bank.name
        bankDetails["interest"] = interest
        bankDetails["type"] = bank.type
        bankDetails["policy"] = policy
        // console.log("added the result  ")
        // console.log(bankDetails)
        results.push(bankDetails)
    }

    //Filter chosen is safety
    if(filter == 1){
        //group by public, private banks
        let group = results.reduce((r, a) => {
            r[a.type] = [...r[a.type] || [], a];
            return r;
           }, {});
       
        let public = group.public
        let private = group.private 

        public.sort(decreasingInterestOrder)
        private.sort(decreasingInterestOrder)
        public.push.apply(public, private)
        //showTable(public)
        ret = public
    }
    else if(filter == 0) {
        //console.log('The results are after sorting')
        results.sort(decreasingInterestOrder)
        //showTable(results)
        ret = results
    }
    console.log("options recommended ")
    console.log(ret)
    return ret
}

function calculateInterest(tenureSlabs, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually){
    let interest = 0
    let policy = ""
    for(slab of tenureSlabs){
        if(findTenureSlab(slab, totalTenure)){
            interest = 0
            policy = slab._id.toString()
            if(isSenior){  
                console.log(compute(principal, totalTenure, slab.senior, cumulative, nonCumulative, monthly, quarterly, semiAnnually))  
                interest = compute(principal, totalTenure, slab.senior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
            }
            else{
                console.log("NOT A SENIOR")
                console.log(slab.general)
                console.log(principal, totalTenure, slab.general, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
                interest = compute(principal, totalTenure, slab.general, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
            }
        }
    }
    console.log("In calculate interest these work now ")
    console.log([interest, policy])
    return [interest, policy]
}

//return the time slab where the total tenure is present
function findTenureSlab(slab, totalTenure){
    let duration = slab.period.split(",")
    let start = parseInt(duration[0])
    let end = parseInt(duration[1])
    if(start <= totalTenure && end >= totalTenure){
        return true
    }
    return false
}

//Based on the options chosen, the interest is calculated
function compute(principal, totalTenure, interestRate, cumulative, nonCumulative, monthly, quarterly, semiAnnually){
    console.log("in compute fd ")
    console.log(principal, totalTenure, interestRate, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
    if (cumulative){
        console.log(cumulativeFD(principal, totalTenure, interestRate))
        return cumulativeFD(principal, totalTenure, interestRate)
    }
    else{
        return nonCumulativeFD(principal, totalTenure, interestRate, monthly, quarterly, semiAnnually)
    }
}

//cumlative or compound interest 
function cumulativeFD(principal, totalTenure, interestRate){
    //calculate P * (1+r)^n
    totalTenure = (totalTenure / 365) * 4
    interestRate = interestRate / 400 
    let interest = principal * Math.pow((1 + interestRate), totalTenure)
    console.log("interest is ", interest - principal)
    return interest - principal
}

//non cumulative or simple interest, based on how frequently interest is needed
function nonCumulativeFD(principal, totalTenure, interestRate, monthly, quarterly, semiAnnually){
    //number of years, used in the formula PTR/100
    totalTenure = totalTenure / 365
    interestRate = interestRate / 100
    let interest = principal * totalTenure * interestRate
    if(monthly){
        return interest / 12
    }
    else if(quarterly) { 
        return interest / 4
    }
    else{
        return interest / 2
    }
}

//computes the total tenure in days
function tenureInDays(years, months, days){
    console.log("In tenusre days ")
    console.log(years, months, days)
    return 365 * years + 30 * months + days
}

//custom comparator to sort banks based on decreasing interest
function decreasingInterestOrder( firstAmount, secondAmount ) {
    if ( firstAmount.interest > secondAmount.interest ){
      return -1;
    }
    if ( firstAmount.interest < secondAmount.interest ){
      return 1;
    }
    return 0;
 }

 //display monthly, quarterly, semi-annual interest return options

module.exports = router;