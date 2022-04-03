/*
  The requests to /user, will handle all the queries relating
  to the user
*/

// imports and dependencies
const express = require('express')
const router = express.Router()
const User = require('../models/User')

// retrieve all the users present
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find()
    res.status(200).json({ message: allUsers, status: 1 })
  } catch (err) {
    res.status(400).json({ message: 'Error is ' + err, status: 0 })
  }
})

// verify user login
router.post('/login', async (req, res) => {
  console.log('recvd', req.body)
  console.log(req.body.password)

  try {
    await User.find({ email: req.body.email })
      .then((data) => {
        console.log(data)
        if ((data[0].password == req.body.password)) {
          res.status(200).json({ message: 'successful', status: 1 })
        } else {
          res.status(200).json({ message: 'unsuccessful', status: 0 })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    res.status(400)
  } catch (err) {
    console.log(err)
  }
})

// create a user, for the first time (Bookmarks are null here, only personal details added)
router.post('/', async (req, res) => {
  console.log('in the backend UserRouter.js')
  console.log(req.body)
  const UserObject = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    address: req.body.address,
    bookmarks: {
      fd: [],
      personalLoan: [],
      healthInsurance: [],
      homeLoan: [],
      travelInsurance: []
    }
  })
  try {
    User.create(UserObject)
      .then((data) => {
        res.status(200).json({ status: 1 })
      })
      .catch((err) => {
        const resp = { status: 0, message: 'Error is ' + err }
        res.status(400).json(resp)
      })
  } catch (err) {
    console.log(err)
  }

  // try {
  //   // check if a user with this email already exits
  //   await User.find({ email: req.body.email }).then((data) => {
  //     if (data.length > 0) {
  //       res
  //         .status(200)
  //         .json({
  //           status: 0,
  //           message: 'A user with this email already exists. Please login instead.'
  //         })
  //     } else {
  //       // create user
  //       User.create(UserObject)
  //         .then((data) => {
  //           res.status(200).json({ status: 1 })
  //         })
  //         .catch((err) => {
  //           const resp = { status: 0, message: 'Error is ' + err }
  //           res.status(400).json(resp)
  //         })
  //     }
  //   })
  // } catch (err) {
  //   res.status(400).json({ status: 0, message: 'Error is ' + err })
  // }
})

// based on type (fd, loan or insurance the update is made) the chosen policy is added as a bookmark
router.post('/bookmark/:type', async (req, res) => {
  try {
    console.log(req.body)
    console.log('Body is ' + req.body.email)
    const allUsers = await User.find()
    for (const obj of allUsers) {
      if (obj.email === req.body.email) {
        const allBookmarks = obj.bookmarks
        // bookmark for fixed deposit
        if (req.params.type === 'fd') {
          const fd = allBookmarks.fd
          const newObj = { output: {}, input: {} }
          newObj.output = req.body.output
          newObj.input = req.body.input
          fd.push(newObj)
          allBookmarks.fd = fd
        } // bookmark for personal loan
        else if (req.params.type === 'personalLoan') {
          console.log(req.body)
          const personalLoan = allBookmarks.personalLoan
          const newObj = { output: {}, input: {} }
          newObj.output = { amount: req.body.output }
          newObj.input = req.body.input
          personalLoan.push(newObj)
          allBookmarks.personalLoan = personalLoan
        } // bookmark for health insurance
        else if (req.params.type === 'healthInsurance') {
          const healthInsurance = allBookmarks.healthInsurance
          const newObj = { output: {}, input: {} }
          newObj.output = req.body.output
          newObj.input = req.body.input
          healthInsurance.push(newObj)
          allBookmarks.healthInsurance = healthInsurance
        } else if (req.params.type === 'travelInsurance') {
          const travelInsurance = allBookmarks.travelInsurance
          const newObj = { output: {}, input: {} }
          newObj.output = req.body.output
          newObj.input = req.body.input
          travelInsurance.push(newObj)
          allBookmarks.travelInsurance = travelInsurance
        } else if (req.params.type === 'homeLoan') {
          const homeLoan = allBookmarks.homeLoan
          const newObj = { output: {}, input: {} }
          newObj.output = req.body.output
          newObj.input = req.body.input
          homeLoan.push(newObj)
          allBookmarks.homeLoan = homeLoan
        }
        User.findOneAndUpdate({ _id: obj._id }, { bookmarks: allBookmarks }, { upsert: true },
          function (err, res) {
            if (err != null) {
              console.log('Error is ' + err)
            }
          }
        )
      }
    }
    res.status(200).json({ status: 1 })
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 0, message: 'Error is ' + err })
  }
})

// get the details of the user based on email id (serves as the unique identifier)
router.post('/data', async (req, res) => {
  try {
    const userDetails = await User.find({
      email: req.body.email
    })
    console.log(req.body, userDetails)
    res.status(200).json({ status: 0, message: userDetails })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 0, message: 'Could not fetch details' })
  }
})

module.exports = router
