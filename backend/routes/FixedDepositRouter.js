// imports and dependencies
const express = require('express')
const router = express.Router()
const FD = require('../models/FixedDeposit')

router.get('/', async (req, res) => {
  try {
    const allFDs = await FD.find()
    res.status(200).json({ message: allFDs, status: 1 })
  } catch (err) {
    res.status(400).json({ message: 'Error is ' + err, status: 0 })
  }
})

router.post('/', async (req, res) => {
  const FDObject = new FD({
    name: req.body.name,
    type: req.body.type,
    under_two_cr: req.body.under_two_cr,
    two_five_cr: req.body.two_five_cr
  })
  try {
    FD.create(FDObject)
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

router.put('/:email', async (req, res) => {
  try {
    FD.updateOne({ email: req.params.email }, { age: req.body.age })
      .then(data => {
        res.status(200).json({ status: 1 })
      })
      .catch(err => {
        res.status(400).json({ status: 0, message: 'Error is ' + err })
      })
  } catch (err) {
    res.status(400).json({ status: 0, message: 'Error is ' + err })
  }
})

router.delete('/:email', async (req, res) => {
  try {
    const email = req.params.email
    FD.deleteOne({ email: email })
      .then(data => {
        res.status(200).json({ status: 1 })
      })
      .catch(err => {
        res.status(400).json({ status: 0, message: 'Error is ' + err })
      })
  } catch (err) {
    res.status(400).json({ status: 0, message: 'Error is ' + err })
  }
})

module.exports = router
