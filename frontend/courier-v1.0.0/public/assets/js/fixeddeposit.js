//computes the total tenure in days
function tenureInDays(years, months, days){
    return 365 * years + 30 * months + days
}

//utility to clear the output table
function clearTable(){
    var table = document.getElementById("table");
    //clear the table to render the new ordering
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }
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
    var nonCumulative = document.getElementById("noncumulative").checked
    var text = document.getElementById("text")
    if (nonCumulative == true){
        text.style.display = "block"
    } else {
        text.style.display = "none"
    }
}

//validate inputs, Interest Rate filter is applied by default
function validateInput(filter=0){
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

    if(principal < 1000 || principal > 50000000){
        alert("Enter an amount between 1000 and 50000000")
        clearTable()
        return;
    }

    else if(totalTenure < 7 || totalTenure > 3650){
        alert("Enter a duration between 7 days and 10 years")
        clearTable()
        return;
    }

    else if(!cumulative && !nonCumulative){
        alert("Choose a cumulative or noncumulative type of FD")
        clearTable()
        return;
    }
    
    else if(nonCumulative && !monthly && !quarterly && !semiAnnually){
        alert("Choose the frequency of interest given back")
        clearTable()
        return;
    }

    else{
        var table = document.getElementById("table");
        getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter);
    }
}

//After input fields are validated, bank data is fetched via a GET request
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

//computation performed and choiced returned
function recommendOptions(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter){   
    //stores the resulting ordering of options
    var results = []
    var allBanks = data.message 
    for(bank of allBanks){
        var interest = 0
        var policy = ""
        var bankDetails = {}
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
       
        var public = group.public
        var private = group.private 

        public.sort(decreasingInterestOrder)
        private.sort(decreasingInterestOrder)
        public.push.apply(public, private)
        showTable(public)
    }
    else if(filter == 0) {
        //console.log('The results are after sorting')
        results.sort(decreasingInterestOrder)
        showTable(results)
    }
}

function calculateInterest(tenureSlabs, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually){
    for(slab of tenureSlabs){
        
        if(findTenureSlab(slab, totalTenure)){
            var interest = 0
            var policy = slab._id.toString()
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
    var duration = slab.period.split(",")
    var start = parseInt(duration[0])
    var end = parseInt(duration[1])
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

//display the results after interest computation
function showTable(resultTable){
    var table = document.getElementById("table");
    clearTable()
    for(bank of resultTable){
        var row = table.insertRow()
        var cell = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)
        cell.innerHTML = bank.name
        cell2.innerHTML = bank.interest.toFixed(2)
        cell3.innerHTML = bank.type
        var button = document.createElement("button", "save")
        button.innerHTML = "save"
        with ({ policy : bank.policy }) {
            button.onclick = function() {
              bookmarkOption(policy, "fd");
            };
        }
        cell4.appendChild(button)
    }
}

//bookmarks the option chosen
function bookmarkOption(policy, type){

    //assuming that the user details will be stored in localStorage on login/signup, so that will be used
    
    localStorage.setItem("email", "test")
    var email = localStorage.getItem("email", email)
    const option = { email : email, bookmarks : {fd : policy} };
    //alert(policy)
    console.log("policy added is " + policy)
    var URL = "http://localhost:9001/user/bookmark/" + type
    axios.post(URL, option)
    .then(response => {
        if(response.data.status === 1){
            alert("bookmark added")
        }
        else{
            alert("An error occured, try again :(")
        }
    });
}



