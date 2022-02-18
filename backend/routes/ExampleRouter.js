// imports and dependencies
const express = require('express')
const router = express.Router()
const Example = require('../models/Example')

router.get('/', async (req, res) => {
  try {
    const allExamples = await Example.find()
    res.status(200).json({ message: allExamples, status: 1 })
  } catch (err) {
    res.status(400).json({ message: 'Error is ' + err, status: 0 })
  }
})

router.post('/', async (req, res) => {
  const ExampleObject = new Example({
    age: req.body.age,
    email: req.body.email
  })
  try {
    Example.create(ExampleObject)
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
    Example.updateOne({ email: req.params.email }, { age: req.body.age })
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
    Example.deleteOne({ email: email })
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
