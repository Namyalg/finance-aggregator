var express = require('express');
var axios = require('axios')
var router = express.Router();

router.get('/', (req, res) => {
    res.render('fixed-deposit');
})

module.exports = router;