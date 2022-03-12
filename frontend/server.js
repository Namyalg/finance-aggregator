// include packages
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

// include sub-routers
var fixedDepositRouter = require('./routes/fixed-deposit');
var personalLoanRouter = require('./routes/personal-loan');
var homeLoanRouter = require('./routes/home-loan');
var travelInsuranceRouter = require('./routes/travel-insurance');
var healthInsuranceRouter = require('./routes/health-insurance');
var userRouter = require('./routes/user')

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// include public directory
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret lubba wubba dubba etc etc'
}));

// assign routers
app.use('/user', userRouter);
app.use('/fixed-deposit', fixedDepositRouter);
app.use('/personal-loan', personalLoanRouter);
app.use('/home-loan', homeLoanRouter);
app.use('/travel-insurance', travelInsuranceRouter);
app.use('/health-insurance', healthInsuranceRouter);
// connect to an endpoint
module.exports = app;
const port = 8000
app.listen(port, () => {
    console.log("Frontend server live at port", port);
})