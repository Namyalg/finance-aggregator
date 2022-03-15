var express = require('express');
var axios = require('axios')
var router = express.Router();

router.get('/', (req, res) => {
    res.render('fixed-deposit', {result : [1,2,4]});
})

router.post('/', (req, res) => {

    res.render('fixed-deposit', {result : [req.body.amount, req.body.time]});
})

module.exports = router;