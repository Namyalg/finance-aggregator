// imports and dependencies
const express = require('express')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
const router = express.Router()
const travelInsuranceDB = require('../models/TravelInsurance')
const axios = require('axios')

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
    const sortBy = req.body.sortBy
    addChoiceToLog(req.body, 'travelInsurance')
    const queryConditions = {}
    if (destination) {
      queryConditions.destination = { $eq: destination }
    }
    const eligibleInsurances = await travelInsuranceDB.find(queryConditions)
    eligibleInsurances.sort(function (a, b) {
      if (sortBy === 'duration') {
        const x = a.duration.split(' ')[0]
        const y = b.duration.split(' ')[0]
        return y - x
      } else if (sortBy === 'premium') {
        return a.premium - b.premium
      }
      return 1
    })
    res.status(200).json({ message: eligibleInsurances, status: 1 })
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
