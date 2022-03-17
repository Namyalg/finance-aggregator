// imports and dependencies
const express = require('express')
const router = express.Router()
const Log = require('../models/Log')

router.get('/', async (req, res) => {
  try {
    const allLogs = await Log.find()
    res.status(200).json({ message: allLogs, status: 1 })
  } catch (err) {
    res.status(400).json({ message: 'Error is ' + err, status: 0 })
  }
})

router.post('/', async (req, res) => {
  const LogObject = new Log({
    policy: req.body.policy,
    date: req.body.date,
    type: req.body.type
  })
  console.log(LogObject)
  try {
    Log.create(LogObject)
      .then(data => {
        res.status(200).json({ status: 1 })
      })
      .catch(err => {
        const resp = { status: 0, message: 'Error is ' + err }
        console.log(resp)
        res.status(400).json(resp)
      })
  } catch (err) {
    res.status(400).json({ status: 0, message: 'Error is ' + err })
  }
})

module.exports = router
