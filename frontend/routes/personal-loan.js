var express = require('express');
const axios = require('axios')
var router = express.Router();

var backendURL = "http://localhost:9001/personalLoan"

router.get('/', async(req, res) => {
    var loans = []
    await axios
        .get(backendURL)
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            loans = res.data.message
        })
        .catch(error => {
            console.error(error)
        })
    console.log(loans.length, " loans returned")
    res.render('personal-loan', { loans: loans })
})

module.exports = router;