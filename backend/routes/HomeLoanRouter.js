const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const homeLoanDB = require('../models/HomeLoan')
const axios = require('axios')

router.get('/', async (req, res) => {
  try {
    const allLoans = await homeLoanDB.find()
    res.status(200).json({ message: allLoans, status: 1 })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err, status: 0 })
  }
})

router.post('/', async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount)
    const tenure = parseFloat(req.body.tenure)
    const age = parseFloat(req.body.age)
    const rate_package = req.body.rate_packages
    addChoiceToLog(req.body, "homeLoan")
    let query = {}
    query = {
      $or: [
        { 'loan_amount.min': 0 },
        { 'loan_amount.min': { $lte: amount } }
      ],
      $or: [
        { 'loan_amount.max': 0 },
        { 'loan_amount.max': { $gte: amount } }
      ],
      $or: [
        { 'age.min': 0 },
        { 'age.min': { $lte: age } }
      ],
      $or: [
        { 'age.max': 0 },
        { 'age.max': { $gte: age } }
      ],
      max_tenure: { $gte: tenure }
      // ['rate_packages_available.' + rate_package]: true,
    }
    console.log(rate_package)
    query['rate_packages_available.' + rate_package] = true
    const loans = await homeLoanDB.find(query)
    res.status(200).json({ message: loans, status: 1 })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err, status: 0 })
  }
})

function addChoiceToLog (input, type) {
  const currentdate = new Date()
  const datetime = currentdate.getDate() + '/' +
                  (currentdate.getMonth() + 1) + '/' +
                  currentdate.getFullYear() + ' @ ' +
                  currentdate.getHours() + ':' +
                  currentdate.getMinutes() + ':' +
                  currentdate.getSeconds() + ' IST'
  const log = { input: input, date: datetime }
  console.log(log)
  const URL = 'http://localhost:9001/log/' + type
  try {
    axios.post(URL, log)
      .then(response => {
        if (response.data.status === 1) {
          console.log('log added')
        } else {
          console.log('An error occured, try again :(')
        }
      })
  } catch (e) {
    console.log('Error is ' + e)
  }
}

module.exports = router
