function computeTenureInDays(years, months, days){
    return 365 * years + 30 * months + days
}

function validateInput(){

    var principal = parseInt(document.getElementById("principal").value)
    var years = parseInt(document.getElementById("years").value)
    var months = parseInt(document.getElementById("months").value)
    var days = parseInt(document.getElementById("days").value)
    var totalTenure = computeTenureInDays(years, months, days)
    var isSenior = document.getElementById("senior").checked
    var cumulative = document.getElementById("cumulative").checked
    var nonCumulative = document.getElementById("noncumulative").checked
    var monthly = document.getElementById("monthly").checked
    var quarterly = document.getElementById("quarterly").checked
    var semiAnnually = document.getElementById("semiannually").checked

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
        // console.log("cumulative " + document.getElementById("cumulative").checked)
        // console.log("non cumulative " + document.getElementById("noncumulative").checked)
        // console.log("Data from the db is ")
        getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually);
        // var x = d.then(result => result.data)
        // console.log("x is ", x)
        //recommendOptions()
    }
    // console.log("amount " + typeof (document.getElementById("principal").value))
    // console.log("y " + typeof (parseInt(document.getElementById("years").value)))
    // console.log("m " + document.getElementById("months").value)
    // console.log("d " + document.getElementById("days").value)
    // console.log("is senior " + document.getElementById("senior").checked)
    // console.log("cumulative " + document.getElementById("cumulative").checked)
    // console.log("non cumulative " + document.getElementById("noncumulative").checked)
}

function getData(principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually){
    console.log("The data from the database")
    axios.get("http://localhost:9001/fd")
    .then(response => {
        data = response.data
        showData(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually);
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

function showData(data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually){
    console.log("In show data");
    var table = document.getElementById("table");
    for(d of data.message){
        console.log(d.name)
        //document.getElementById("test").innerHTML = d.name
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        cell1.innerHTML = d.name;
    }
}

function recommendOptions(){
    axios.get("http://localhost:9001/fd")
    .then(response => {
        // access parsed JSON response data using response.data field
        data = response.data
        console.log(data.status)
        console.log(data.message)
    })
    .catch(error => {
        if (error.response) {
        //get HTTP error code
        console.log(error.reponse.status)
        } else {
        console.log(error.message)
        }
    })
}



function cumulativeInterest(principal, totalTenure, rateOfInterest){
    var numOfQuarters = ( totalTenure * 4 ) / 365
    var totalAmount = p * 9
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