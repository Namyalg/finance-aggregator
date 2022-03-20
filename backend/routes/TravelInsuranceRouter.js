// imports and dependencies
const express = require('express')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
const router = express.Router()
const travelInsuranceDB = require('../models/TravelInsurance')

router.get('/', async (req, res) => {
  try {
    const allInsurances = await travelInsuranceDB.find()
    res.status(200).json({ message: allInsurances, status: 1 })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err, status: 0 })
  }
})

router.get('/alldest', async (req, res) => {
  try {
    const allInsurances = await travelInsuranceDB.distinct('destination')
    res.status(200).json({ message: allInsurances, status: 1 })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err, status: 0 })
  }
})

router.post('/query', async (req, res) => {
  console.log('query recvd', req.body)
  try {
    const destination = req.body.destination
    const queryConditions = {}

    if (destination) {
      queryConditions.destination = { $eq: destination }
    }
    const eligibleInsurances = await travelInsuranceDB.find(queryConditions)
    eligibleInsurances.sort(function (a, b) { return a.premium - b.premium })
    res.status(200).json({ message: eligibleInsurances, status: 1 })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err, status: 0 })
  }
})

module.exports = router
