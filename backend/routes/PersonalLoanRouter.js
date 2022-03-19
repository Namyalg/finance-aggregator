// imports and dependencies
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const personalLoanDB = require('../models/PersonalLoan')

router.get('/', async(req, res) => {
    try {
        const allLoans = await personalLoanDB.find()
        q = await personalLoanDB.find({ 'interest.general': { $exists: false } })
        res.status(200).json({ message: allLoans, status: 1 })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err, status: 0 })
    }
})


router.post("/query", async(req, res) => {
    try {
        const loanAmount = parseFloat(req.body.amount);
        const tenure = parseFloat(req.body.tenure);
        const interest = parseFloat(req.body.interest);
        var queryConditions = {}

        if (loanAmount) {
            queryConditions["amount.general.minimum"] = { $lte: loanAmount }
            queryConditions["amount.general.maximum"] = { $gte: loanAmount }
        }

        if (tenure) {
            queryConditions["tenure.general.years"] = { $gte: tenure }
        }

        if (interest) {
            queryConditions["interest.general.range_from"] = { $lte: interest }
            queryConditions["interest.general.range_upto"] = { $gte: interest }
        }

        if (req.body.sector) {
            queryConditions["sector"] = req.body.sector
        }
        var eligibleLoans = await personalLoanDB.find(queryConditions);
        res.status(200).json({ message: eligibleLoans, status: 1 });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err, status: 0 });
    }

})

module.exports = router