// include packages
var express = require('express');
var path = require('path');
var cors = require('cors')
var app = express()

app.use(cors())
var bodyParser = require('body-parser');
var sessions = require('express-session');
const cookieParser = require("cookie-parser");

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24 * 24;

// include sub-routers
var fixedDepositRouter = require('./routes/fixed-deposit');
var personalLoanRouter = require('./routes/personal-loan');
var homeLoanRouter = require('./routes/home-loan');
var travelInsuranceRouter = require('./routes/travel-insurance');
var healthInsuranceRouter = require('./routes/health-insurance');
var userRouter = require('./routes/user')

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// include public directory
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(sessions({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "holaitsasecretdjnfbnlshfgbnsfgnbkfgnb",
    cookie: { maxAge: oneDay }
}));

// assign routers
app.get('/', (req, res) => {
    res.render('landingpage')
});
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