//computes the total tenure in days
function tenureInDays(years, months, days){
    return 365 * years + 30 * months + days
}

//passing the default filter option to the function to validate input
function validateInput(filter=1){
    var principal = parseInt(document.getElementById("principal").value)
    var years = parseInt(document.getElementById("years").value)
    var months = parseInt(document.getElementById("months").value)
    var days = parseInt(document.getElementById("days").value)
    var totalTenure = tenureInDays(years, months, days)
    var isSenior = document.getElementById("senior").checked
    var cumulative = document.getElementById("cumulative").checked
    var nonCumulative = document.getElementById("noncumulative").checked
    var monthly = document.getElementById("monthly").checked
    var quarterly = document.getElementById("quarterly").checked
    var semiAnnually = document.getElementById("semiannually").checked
    // var selectedFilter = document.getElementsByTagName('filters');
    // var str= ex.options[ex.selectedIndex].value;

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
        var table = document.getElementById("table");
        for(var i = table.rows.length - 1; i > 0; i--)
        {
            table.deleteRow(i);
        }
        getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
    }
    // console.log("amount " + typeof (document.getElementById("principal").value))
    // console.log("y " + typeof (parseInt(document.getElementById("years").value)))
    // console.log("m " + document.getElementById("months").value)
    // console.log("d " + document.getElementById("days").value)
    // console.log("is senior " + document.getElementById("senior").checked)
    // console.log("cumulative " + document.getElementById("cumulative").checked)
    // console.log("non cumulative " + document.getElementById("noncumulative").checked)
}

//Input fields are validated, bank data is fetched via a GET request
function getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter){
    console.log("The data from the database")
    axios.get("http://localhost:9001/fd")
    .then(response => {
        data = response.data
        recommendOptions(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
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

//Based on the options chosen, the interest is calculated
function compute(principal, totalTenure, interestRate, cumulative, nonCumulative, monthly, quarterly, semiAnnually){
    if (cumulative){
        return cumulativeFD(principal, totalTenure, interestRate)
    }
    else{
        return nonCumulativeFD(principal, totalTenure, interestRate, monthly, quarterly, semiAnnually)
    }
}

//Flow of 
function recommendOptions(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter){   
    //stores the resulting ordering of options
    var results = []

    var allBanks = data.message 
    for(bank of allBanks){
        var interest = 10
        var bankDetails = {}
        if(principal < 20000000){
            interest = calculateInterest(bank.under_two_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
        }
        else{
            interest = calculateInterest(bank.two_five_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
        }
        bankDetails["name"] = bank.name
        bankDetails["interest"] = interest
        bankDetails["type"] = bank.type
        results.push(bankDetails)
    }

    //console.log("In show data");
    var table = document.getElementById("table");
    
    //clear the table to render the new ordering
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }
    if(filter == 2){
        let group = results.reduce((r, a) => {
            r[a.type] = [...r[a.type] || [], a];
            return r;
           }, {});
       
        var public = group.public
        var private = group.private 

        public.sort(decreasingInterestOrder)
        private.sort(decreasingInterestOrder)
        public.push.apply(public, private)
        for(bank of public){
            var row = table.insertRow()
            var cell = row.insertCell(0)
            var cell2 = row.insertCell(1)
            var cell3 = row.insertCell(2)
            cell.innerHTML = bank.name
            cell2.innerHTML = bank.interest.toFixed(2)
            console.log(bank.type)
            cell3.innerHTML = bank.type
        }
    }
    else{
        //console.log('The results are after sorting')
        results.sort(decreasingInterestOrder)
        for(bank of results){
            var row = table.insertRow()
            var cell = row.insertCell(0)
            var cell2 = row.insertCell(1)
            var cell3 = row.insertCell(2)
            cell.innerHTML = bank.name
            cell2.innerHTML = bank.interest.toFixed(2)
            cell3.innerHTML = bank.type
        }
    }
}

function calculateInterest(tenureSlabs, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually){
    for(slab of tenureSlabs){
        if(findTenureSlab(slab, totalTenure)){
            if(isSenior){
                return compute(principal, totalTenure, slab.senior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
            }
            else{
                return compute(principal, totalTenure, slab.general, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
            }
        }
    }
    return 0
}

//return the time slab where the total tenure is present
function findTenureSlab(slab, totalTenure){
    var duration = slab.period.split(",")
    var start = parseInt(duration[0])
    var end = parseInt(duration[1])
    if(start <= totalTenure && end >= totalTenure){
        return true
    }
    return false
}

//cumlative or compound interest 
function cumulativeFD(principal, totalTenure, interestRate){
    //calculate P * (1+r)^n
    totalTenure = (totalTenure / 365) * 4
    interestRate = interestRate / 400 
    var interest = principal * Math.pow((1 + interestRate), totalTenure)
    return interest - principal
}

//non cumulative or simple interest, based on how frequently interest is needed
function nonCumulativeFD(principal, totalTenure, interestRate, monthly, quarterly, semiAnnually){
    //number of years, used in the formula PTR/100
    totalTenure = totalTenure / 365
    interestRate = interestRate / 100
    var interest = principal * totalTenure * interestRate
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

//custom comparator to 
function decreasingInterestOrder( firstAmount, secondAmount ) {
    if ( firstAmount.interest > secondAmount.interest ){
      return -1;
    }
    if ( firstAmount.interest < secondAmount.interest ){
      return 1;
    }
    return 0;
 }

function showOptions(){
    var nonCumulative = document.getElementById("noncumulative").checked
    var text = document.getElementById("text")
    if (nonCumulative == true){
        text.style.display = "block"
    } else {
        text.style.display = "none"
    }
}

function bookmarkOption(){
    alert("Option will be bookmarked")
}

function safetyFilter(){
    alert("Filter changed")
}