// imports and dependencies
const express = require('express')
const router = express.Router()
const Log = require('../models/Log')

router.get('/', async (req, res) => {
  try {
    const allLogs = await Log.find()
    console.log((allLogs[0].hl))

    res.status(200).json({ message: allLogs[0], status: 1 })
  } catch (err) {
    res.status(400).json({ message: 'Error is ' + err, status: 0 })
  }
})

router.post('/:type', async (req, res) => {
  const log = await Log.find()
  const id = log[0].id
  if (req.params.type === 'fd') {
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
  } if (req.params.type === 'personalLoan') {
    const personalLoan = log[0].pl
    console.log("PL is ")
    console.log(personalLoan)
    personalLoan.push(req.body.input)

    Log.findOneAndUpdate({ _id: id }, {
      // $push: { personalLoan: req.body.input }
      pl: personalLoan
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
  } else if (req.params.type === 'healthInsurance') {
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
  } else if (req.params.type === 'homeLoan') {
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
  } else {
    Log.findOneAndUpdate({ _id: log[0].id }, {
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
