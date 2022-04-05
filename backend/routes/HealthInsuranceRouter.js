/*
  The requests to /fd, will handle all the queries relating
  to health insurance
*/

// imports and dependencies
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const healthInsuranceDB = require('../models/HealthInsurance')
const axios = require('axios')

// On receiving a query from the frontend, computations are performed and returned
router.post('/query', async (req, res) => {
  try {
    const age = parseFloat(req.body.age)
    const no_of_people = parseFloat(req.body.noOfPeople)
    const no_of_diseases = parseFloat(req.body.noOfDiseases)
    const sortCriteria = req.body.criteria
    let allInsurances
    addChoiceToLog(req.body, 'healthInsurance')

    if (sortCriteria == 'premium') { allInsurances = await healthInsuranceDB.find().sort({ premium: 1 }) } else if (sortCriteria == 'cover') { allInsurances = await healthInsuranceDB.find().sort({ cover: 1 }) } else { allInsurances = await healthInsuranceDB.find().sort({ cashless_hospitals: 1 }) }

    for (let i = 0; i < allInsurances.length; i++) {
      allInsurances[i].premium += (1000 * no_of_people) + (2000 * no_of_diseases)
    }
    console.log(allInsurances)
    res.status(200).send({ message: allInsurances, status: 1 })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err, status: 0 })
  }
})


// get all health insurances data stored in the database
router.get('/', async (req, res) => {
  try {
    const allInsurances = await healthInsuranceDB.find()
    console.log(allInsurances.length)
    console.log(allInsurances)
    res.status(200).send({ message: allInsurances, status: 1 })
  } catch (err) {
    console.log(err)
    res.status(400).send({ message: err, status: 0 })
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
