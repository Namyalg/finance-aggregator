let express = require('express');
let axios = require('axios')
let router = express.Router();

router.get('/', (req, res) => {
    res.render('fixed-deposit', {status : 1, result : [1,2,4]});
})

router.post('/', (req, res) => {
    // console.log(req)
    let result = validateInput(filter=0, req)
    console.log(req.body)
    res.render('fixed-deposit', {result : result});
})




//computes the total tenure in days
function tenureInDays(years, months, days){
    return 365 * years + 30 * months + days
}

//reset to the default filter Interest Rate
function resetFilter(){
    //Interest Rate is indexed by 0, Safety by 1
    document.getElementById("filters").selectedIndex = "0";
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
function showOptions(){
    let nonCumulative = document.getElementById("noncumulative").checked
    let text = document.getElementById("text")
    if (nonCumulative == true){
        text.style.display = "block"
    } else {
        text.style.display = "none"
    }
}

//validate inputs, Interest Rate filter is applied by default
// function validateInput(filter=0, req){
//     console.log("req is ")
//     console.log(req.body.frequency)

//     let principal = req.body.principal

//     let years = req.body.years
//     let months = req.body.months
//     let days = req.body.days
//     let totalTenure = tenureInDays(years, months, days)
//     let isSenior = req.body.senior
//     let cumulative = req.body.cumulative
//     let nonCumulative = req.body.noncumulative
//     let monthly = req.body.monthly
//     let quarterly = req.body.quarterly
//     let semiAnnually = req.body.semiannually
//     console.log("cumulative is ")
//     console.log(cumulative)
//     return [monthly, cumulative, principal]
//     if(principal < 1000 || principal > 50000000){
//         alert("Enter an amount between 1000 and 50000000")
//         return;
//     }

//     else if(totalTenure < 7 || totalTenure > 3650){
//         alert("Enter a duration between 7 days and 10 years")
//         return;
//     }

//     else if(!cumulative && !nonCumulative){
//         alert("Choose a cumulative or noncumulative type of FD")
//         return;
//     }
    
//     else if(nonCumulative && !monthly && !quarterly && !semiAnnually){
//         alert("Choose the frequency of interest given back")
//         return;
//     }

//     else{
//         let table = document.getElementById("table");
//         return getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
//     }
// }

function validateInput(filter=0, req){
    console.log("req is ")
    console.log(req.body.frequency)

    let principal = req.body.principal

    let years = req.body.years
    let months = req.body.months
    let days = req.body.days
    let totalTenure = tenureInDays(years, months, days)
    let isSenior = req.body.senior
    let cumulative = req.body.cumulative
    let nonCumulative = req.body.noncumulative
    let monthly = req.body.monthly
    let quarterly = req.body.quarterly
    let semiAnnually = req.body.semiannually
    console.log("cumulative is ")
    console.log(cumulative)
    return [monthly, cumulative, principal]
    if(principal < 1000 || principal > 50000000){
        alert("Enter an amount between 1000 and 50000000")
        return;
    }

    else if(totalTenure < 7 || totalTenure > 3650){
        alert("Enter a duration between 7 days and 10 years")
        return;
    }

    else if(!cumulative && !nonCumulative){
        alert("Choose a cumulative or noncumulative type of FD")
        return;
    }
    
    else if(nonCumulative && !monthly && !quarterly && !semiAnnually){
        alert("Choose the frequency of interest given back")
        return;
    }

    else{
        let table = document.getElementById("table");
        return getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
    }
}

//After input fields are validated, bank data is fetched via a GET request
function getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter){
    console.log("The data from the database")
    axios.get("http://localhost:9001/fd")
    .then(response => {
        data = response.data
        console.log(data)
        return recommendOptions(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
    })
    .catch(error => {
        if (error.response) {
        //get HTTP error code
        console.log(error.reponse.status)
        } else {
        console.log(error.message)
        }
    })
};

//computation performed and choiced returned
function recommendOptions(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter){   
    //stores the resulting ordering of options
    let results = []
    let ret = []
    let allBanks = data.message 
    for(bank of allBanks){
        let interest = 0
        let policy = ""
        let bankDetails = {}
        if(principal < 20000000){
            [interest, policy] = calculateInterest(bank.under_two_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
        }
        else{
            [interest, policy] = calculateInterest(bank.two_five_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
        }
        bankDetails["name"] = bank.name
        bankDetails["interest"] = interest
        bankDetails["type"] = bank.type
        bankDetails["policy"] = policy
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
    return ret
}

function calculateInterest(tenureSlabs, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually){
    for(slab of tenureSlabs){
        
        if(findTenureSlab(slab, totalTenure)){
            let interest = 0
            let policy = slab._id.toString()
            if(isSenior){    
                interest = compute(principal, totalTenure, slab.senior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
            }
            else{
                interest = compute(principal, totalTenure, slab.general, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
            }
        }
    }
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
    if (cumulative){
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

//bookmarks the option chosen
function bookmarkOption(policy, type){

    //assuming that the user details will be stored in localStorage on login/signup, so that will be used
    
    localStorage.setItem("email", "test")
    let email = localStorage.getItem("email", email)
    const option = { email : email, bookmarks : {fd : policy} };
    console.log("policy added is " + policy)
    let URL = "http://localhost:9001/user/bookmark/" + type
    axios.post(URL, option)
    .then(response => {
        if(response.data.status === 1){
            console.log("bookmark added")
        }
        else{
            alert("An error occured, try again :(")
        }
    });
}

function addChoiceToLog(policy, type){
    const currentdate = new Date()
    const datetime = currentdate.getDate() + '/' +
                (currentdate.getMonth() + 1) + '/' +
                currentdate.getFullYear() + ' @ ' +
                currentdate.getHours() + ':' +
                currentdate.getMinutes() + ':' +
                currentdate.getSeconds() + ' IST'
    const log = { policy : policy, type: type, date: datetime};
    console.log(log)
    let URL = "http://localhost:9001/log/"
    axios.post(URL, log)
    .then(response => {
        if(response.data.status === 1){
            console.log("log added")
        }
        else{
            alert("An error occured, try again :(")
        }
    });
}


module.exports = router;