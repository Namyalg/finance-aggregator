// imports and dependencies
const express = require('express')
const router = express.Router()
const Log = require('../models/Log')

router.get('/', async (req, res) => {
  try {
    const allLogs = await Log.find()
    res.status(200).json({ message: allLogs[0], status: 1 })
  } catch (err) {
    res.status(400).json({ message: 'Error is ' + err, status: 0 })
  }
})

//adapt to the schema based on the type of product
router.post('/:type', async (req, res) => {
  const log = await Log.find()
  const id = log[0].id
  if (req.params.type === 'fd') { //for fixed deposit
    Log.findOneAndUpdate({ _id: log[0].id }, {
      $push: { fixedDeposit: req.body.input }
    }, { new: true, safe: true, upsert: true }).then((result) => {
      return res.status(200).json({
        status: 1,
        message: 'Log is added ',
        data: result
      })
    }).catch((error) => {
      return res.status(500).json({
        status: 0,
        message: 'Database Error',
        data: error
      })
    })
  } else if (req.params.type === 'healthInsurance') { // for health insurance
    const healthInsurance = log[0].healthInsurance
    healthInsurance.push(req.body.input)
    Log.findOneAndUpdate({ _id: id }, {
      healthInsurance: healthInsurance
    }, { new: true, safe: true, upsert: true }).then((result) => {
      return res.status(200).json({
        status: 1,
        message: 'Log is added ',
        data: result
      })
    }).catch((error) => {
      return res.status(500).json({
        status: 0,
        message: 'Database Error',
        data: error
      })
    })
  } else if (req.params.type === 'homeLoan') { // for home loan
    Log.findOneAndUpdate({ _id: log[0].id }, {
      $push: { homeLoan: req.body.input }
    }, { new: true, safe: true, upsert: true }).then((result) => {
      return res.status(200).json({
        status: 1,
        message: 'Log is added ',
        data: result
      })
    }).catch((error) => {
      return res.status(500).json({
        status: 0,
        message: 'Database Error',
        data: error
      })
    })
  } else if (req.params.type === 'personalLoan') { // for personal loan
    const personalLoan = log[0].personalLoan
    personalLoan.push(req.body.input)
    Log.findOneAndUpdate({ _id: log[0].id }, { personalLoan: personalLoan }
    ).then((result) => {
      return res.status(200).json({
        status: 1,
        message: 'Log is added ',
        data: result
      })
    }).catch((error) => {
      return res.status(500).json({
        status: 0,
        message: 'Database Error',
        data: error
      })
    })
  } else {
    Log.findOneAndUpdate({ _id: log[0].id }, { // for travel insurance
      $push: { travelInsurance: req.body.input }
    }, { new: true, safe: true, upsert: true }).then((result) => {
      return res.status(200).json({
        status: 1,
        message: 'Log is added ',
        data: result
      })
    }).catch((error) => {
      return res.status(500).json({
        status: 0,
        message: 'Database Error',
        data: error
      })
    })
  }
})

module.exports = router
