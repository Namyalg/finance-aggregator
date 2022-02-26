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

// create a user, for the first time (Bookmarks are null here, only personal details added)
router.post('/', async (req, res) => {
  const UserObject = new User({
    name: req.body.name,
    email: req.body.email,
    bookmarks: {
      fd: [],
      loans: [],
      insurance: []
    }
  })
  try {
    User.create(UserObject)
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

// based on type (fd, loan or insurance the update is made) the chosen policy is added as a bookmark
router.post('/bookmark/:type', async (req, res) => {
  try {
    const allUsers = await User.find()
    for (const obj of allUsers) {
      if (obj.email === req.body.email) {
        var allBookmarks = obj.bookmarks
        if (req.params.type === 'fd') {
          var fd = allBookmarks.fd
          fd.push(req.body.bookmarks.fd)
          allBookmarks.fd = fd
        } else if (req.params.type === 'loan') {
          var loan = allBookmarks.loan
          loan.push(req.body.bookmarks.loan)
          allBookmarks.loan = loan
        } else if (req.params.type === 'insurance') {
          var insurance = allBookmarks.insurance
          insurance.push(req.body.bookmarks.insurance)
          allBookmarks.insurance = insurance
        }
        User.findOneAndUpdate({ _id: obj._id }, { bookmarks: allBookmarks }, { upsert: true }, function (err, res) {
          if (err != null) {
            console.log('Error is ' + err)
          }
        })
      }
    }
    res.status(200).json({ status: 1 })
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 0, message: 'Error is ' + err })
  }
})

module.exports = router
