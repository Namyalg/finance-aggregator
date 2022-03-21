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

// router.post('/', async (req, res) => {
//   const LogObject = new Log({
//     policy: req.body.policy,
//     date: req.body.date,
//     type: req.body.type
//   })
//   console.log(LogObject)
//   try {
//     Log.create(LogObject)
//       .then(data => {
//         res.status(200).json({ status: 1 })
//       })
//       .catch(err => {
//         const resp = { status: 0, message: 'Error is ' + err }
//         console.log(resp)
//         res.status(400).json(resp)
//       })
//   } catch (err) {
//     res.status(400).json({ status: 0, message: 'Error is ' + err })
//   }
// })

router.post('/:type', async (req, res) => {
  const log = await Log.find()
  console.log("THE input from got is ")
  console.log(req.body.input)
  console.log(log[0].healthInsurance)

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
  } else if (req.params.type === 'personalLoan') {
    Log.findOneAndUpdate({ _id: log[0].id }, {
      $push: { personalLoan: req.body.input }
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
    console.log("IN THE LOG ROUTER for health insurance")
    Log.findOneAndUpdate({ _id: log[0].id }, {
      $push: { healthInsurance: req.body.input }
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
