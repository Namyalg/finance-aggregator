var express = require("express");
const axios = require("axios");
var router = express.Router();

var backendURL = "http://localhost:9001/personalLoan";
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// signup
router.get('/signup', (req, res) => {
    res.render('signup', {
        error: ""
    })
})

router.post('/signup', (req, res) => {
    const email = req.body.email
    if (emailRegex.test(email)) {
        res.render("index")
    } else {
        res.render("signup", { error: "Please enter a valid email" })
    }
    console.log(req.body.email)
})

// login
router.get('/login', (req, res) => {
    res.render('login', {
        error: ""
    })
})

module.exports = router;