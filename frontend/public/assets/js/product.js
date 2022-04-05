var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
function expand(index) {
    var i, x;
    x = document.getElementsByClassName("details");
    if (getComputedStyle(document.getElementById(index)).display === "block") {
        document.getElementById(index).style.display = "none";
    }
    else {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        document.getElementById(index).style.display = "block";
    }
}

function backgroundScheme() {
    var col;
    if (index % 2 === 0) {
        col = "#F3E4F1";
    }
    // else if (index % 3 == 1) {
    //     col = "#D5EBDA";
    // }
    else {
        col = "#ffdbb3";
    }
    document.getElementById(index).style.color = col;
}
var cards = document.getElementsByClassName("result1");
console.log(cards.length);
var col;
for (var i = 0; i < cards.length; i++) {
    if (i % 2 === 0) {
        col = "#ffebcb";
    }

    else {
        col = "#fff5e0";
    }
    cards[i].style.backgroundColor = col;
}