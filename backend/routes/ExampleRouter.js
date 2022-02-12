//imports and dependencies
const express = require('express')
const router = express.Router()
const example = require('../models/Example') 

router.get("/", async (req, res) => {
    try{
        var allExamples = await example.find()
        res.status(200).json({message : allExamples, status : 1})
    }
    catch(err){
        res.status(400).json({status : 0, message : "Error is " + err})
    }
})


router.post("/", async (req, res) => {
    var ExampleObject = new example({
        age : req.body.age,
        email : req.body.email
    })
    try{
        example.create(ExampleObject)
        .then(data => {
            res.status(200).json({status : 1})
        })
        .catch(err => {
            var resp = {status : 0, message : "Error is " + err}
            console.log(resp)
            res.status(400).json(resp)
        })
    }
    catch(err){
        res.status(400).json({status : 0, message : "Error is " + err})
    }
})


router.put("/:email", async (req, res) => {
   
    try{
        example.updateOne({ email: req.params.email }, {age: req.body.age})
        .then(data => {
            res.status(200).json({status : 1})
        })
        .catch(err => {
            res.status(400).json({status : 0, message : "Error is " + err})
        })
    }
    catch(err){
        res.status(400).json({status : 0, message : "Error is " + err})
    }
})


router.delete("/:email", async (req, res) => {
    try{
        var email = req.params.email
        example.deleteOne({ email: email })
        .then(data => {
            res.status(200).json({status : 1})
        })
        .catch(err => {
            res.status(400).json({status : 0, message : "Error is " + err})
        })
    }
    catch(err){
        res.status(400).json({status : 0, message : "Error is " + err})
    }
})


module.exports = router;