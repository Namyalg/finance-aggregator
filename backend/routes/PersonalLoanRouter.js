// imports and dependencies
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const personalLoanDB = require('../models/PersonalLoan')

router.get('/', async(req, res) => {
    try {
        const allLoans = await personalLoanDB.find()
        console.log(typeof(personalLoanDB))
        console.log(typeof(allLoans))
        console.log(allLoans.length, " loans returned")
        res.status(200).json({ message: allLoans, status: 1 })
    } catch (err) {
        res.status(400).json({ message: err, status: 0 })
    }
})

module.exports = router