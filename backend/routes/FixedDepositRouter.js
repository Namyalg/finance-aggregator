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

router.post('/add', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const data = await FD.find()
    let result = []
    console.log('In the backend CHECKING FOR FILTER')
    console.log(req.body.filters)
    if (req.body.filters === 'amount') {
      result = recommendOptions(data, req.body.principal,
        req.body.totalTenure, req.body.isSenior,
        req.body.cumulative, req.body.nonCumulative,
        req.body.monthly, req.body.quarterly, req.body.semiAnnually, 0)
    } else {
      result = recommendOptions(data, req.body.principal,
        req.body.totalTenure, req.body.isSenior,
        req.body.cumulative, req.body.nonCumulative,
        req.body.monthly, req.body.quarterly, req.body.semiAnnually, 1)
    }
    res.status(200).json({ message: result, status: 1 })
  } catch (err) {
    res.status(400).json({ message: 'Error is ' + err, status: 0 })
  }
})

// computation performed and choiced returned
function recommendOptions (data, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually, filter) {
  // stores the resulting ordering of options
  var results = []
  let ret = []
  let info
  let bankDetails = {}
  let interest = 0.0
  let policy = ''
  for (const bank of data) {
    bankDetails = {}
    if (principal < 20000000) {
      info = calculateInterest(bank.under_two_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
    } else {
      info = calculateInterest(bank.two_five_cr, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
    }
    interest = Math.round(info[0], 2)
    policy = info[1]
    bankDetails.name = bank.name
    bankDetails.interest = interest
    bankDetails.type = bank.type
    bankDetails.policy = policy
    bankDetails.interestRate = info[2]
    bankDetails.slab = info[3].period
    results.push(bankDetails)
  }
  // Filter chosen is safety
  if (filter === 1) {
    console.log('results here ')
    console.log(results)
    // group by public_banks, privateBanks banks
    const group = results.reduce((r, a) => {
      r[a.type] = [...r[a.type] || [], a]
      return r
    }, {})
    const publicBanks = group.public
    const privateBanks = group.private
    console.log(publicBanks)
    console.log(privateBanks)

    publicBanks.sort(decreasingInterestOrder)
    privateBanks.sort(decreasingInterestOrder)
    publicBanks.push.apply(publicBanks, privateBanks)
    ret = publicBanks
  } else if (filter === 0) {
    // console.log('The results are after sorting')
    results.sort(decreasingInterestOrder)
    // showTable(results)
    ret = results
  }
  for(var x of ret){
    console.log(x)
  }
  return ret
}

function calculateInterest (tenureSlabs, principal, totalTenure, isSenior, cumulative, nonCumulative, monthly, quarterly, semiAnnually) {
  let interest = 0
  let policy = ''
  let interestRate
  let reqSlab
  for (const slab of tenureSlabs) {
    if (findTenureSlab(slab, totalTenure)) {
      reqSlab = slab
      interest = 0
      policy = slab._id.toString()
      if (isSenior) {
        interest = compute(principal, totalTenure, slab.senior, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
        interestRate = slab.senior
      } else {
        interest = compute(principal, totalTenure, slab.general, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
        interestRate = slab.general
      }
      break
    }
  }
  return [interest, policy, interestRate, reqSlab]
}

// return the time slab where the total tenure is present
function findTenureSlab (slab, totalTenure) {
  const duration = slab.period.split(',')
  const start = parseInt(duration[0])
  const end = parseInt(duration[1])
  if (start <= totalTenure && end >= totalTenure) {
    return true
  }
  return false
}

// Based on the options chosen, the interest is calculated
function compute (principal, totalTenure, interestRate, cumulative, nonCumulative, monthly, quarterly, semiAnnually) {
  console.log(principal, totalTenure, interestRate, cumulative, nonCumulative, monthly, quarterly, semiAnnually)
  if (cumulative) {
    console.log(cumulativeFD(principal, totalTenure, interestRate))
    return cumulativeFD(principal, totalTenure, interestRate)
  } else {
    return nonCumulativeFD(principal, totalTenure, interestRate, monthly, quarterly, semiAnnually)
  }
}

// cumlative or compound interest
function cumulativeFD (principal, totalTenure, interestRate) {
  // calculate P * (1+r)^n
  totalTenure = (totalTenure / 365) * 4
  interestRate = interestRate / 400
  const interest = principal * Math.pow((1 + interestRate), totalTenure)
  return interest - principal
}

// non cumulative or simple interest, based on how frequently interest is needed
function nonCumulativeFD (principal, totalTenure, interestRate, monthly, quarterly, semiAnnually) {
  // number of years, used in the formula PTR/100
  totalTenure = totalTenure / 365
  interestRate = interestRate / 100
  const interest = principal * totalTenure * interestRate
  if (monthly) {
    return interest / 12
  } else if (quarterly) {
    return interest / 4
  } else {
    return interest / 2
  }
}

// bookmarks the option chosen
function bookmarkOption (policy, type) {
  // assuming that the user details will be stored in localStorage on login/signup, so that will be used
  localStorage.setItem('email', 'test')
  const email = localStorage.getItem('email', email)
  const option = { email: email, bookmarks: { fd: policy } }
  console.log('policy added is ' + policy)
  const URL = 'http://localhost:9001/user/bookmark/' + type
  axios.post(URL, option)
    .then(response => {
      if (response.data.status === 1) {
        console.log('bookmark added')
      } else {
        alert('An error occured, try again :(')
      }
    })
}

function addChoiceToLog (policy, type) {
  const currentdate = new Date()
  const datetime = currentdate.getDate() + '/' +
              (currentdate.getMonth() + 1) + '/' +
              currentdate.getFullYear() + ' @ ' +
              currentdate.getHours() + ':' +
              currentdate.getMinutes() + ':' +
              currentdate.getSeconds() + ' IST'
  const log = { policy: policy, type: type, date: datetime }
  console.log(log)
  const URL = 'http://localhost:9001/log/'
  axios.post(URL, log)
    .then(response => {
      if (response.data.status === 1) {
        console.log('log added')
      } else {
        alert('An error occured, try again :(')
      }
    })
}

// custom comparator to sort banks based on decreasing interest
function decreasingInterestOrder (firstAmount, secondAmount) {
  if (firstAmount.interest > secondAmount.interest) {
    return -1
  }
  if (firstAmount.interest < secondAmount.interest) {
    return 1
  }
  return 0
}

module.exports = router
