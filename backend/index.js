/*
    This file is used to set up the backend server, consists of the imports and routes
*/

//imports and dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//middlewares
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//make the database connection
const uri = process.env.DB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connection to the database is successful")
}).catch((err) => {
    console.log("error is" + err)
})

app.get('/test', (req, res) => {
    res.json({message : "This is a test route"})
})

app.get("/", (req, res) => {
    res.json({message : "Landing page"})
})

//sample CRUD functionality requiring, name and age of a user
const exampleRouter = require("./routes/ExampleRouter")
app.use('/example', exampleRouter)


var port = process.env.PORT || 9001
app.listen(port, function(){
    console.log("server started on PORT ", port)
})