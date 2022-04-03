var express = require("express");
const axios = require("axios");
const { response } = require("../server");
var router = express.Router();

var backendURL = "http://localhost:9001/user";
const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// signup
router.get("/signup", (req, res) => {
    res.render("signup", {
        error: "",
    });
});

router.post("/signup", async (req, res) => {
    const email = req.body.email
    if (emailRegex.test(email)) {
        // const salt = await bcrypt.genSalt(10);
        await axios.post(backendURL, {
            name: req.body.name,
            email: email,
            age: req.body.age,
            // password: await bcrypt.hash(req.body.pwd, salt),
            password: req.body.pwd,
            address: req.body.address
        }).then((response) => {
            if (response.data.status == 0) {
                res.render("signup", { error: response.data.message });
            } else {
                // successfull signup
                var session = req.session
                session.email = email
                res.render("index");
            }
        }).catch((error) => {
            console.log(error)
        });
    } else {
        res.render("signup", { error: "Please enter a valid email" });
    }
});

// login
router.get("/login", (req, res) => {
    res.render("login", {
        error: "",
    });
});

router.post("/login", async (req, res) => {
    console.log("recvd", req.body)
    await axios.post(backendURL + "/login", {
        email: req.body.email,
        password: req.body.pwd
    }).then((response) => {
        console.log(response)
        if (response.data.status == 0) {
            res.render("login", { error: "Invalid Credentials" })
        } else {
            req.session.email = req.body.email
            res.redirect("/user/dashboard")
        }
    })
});

// dashboard
router.get("/dashboard", async (req, res) => {
    var name = "",
        email = req.session.email
    await axios.post(backendURL + "/data", {
        email: email
    }).then((userDetails) => {
        userDetails = userDetails.data.message[0]
        name = userDetails.name
        bookmarks = userDetails.bookmarks
    }).catch((error) => {
        console.log(error)
    })

    // await axios.get("https://localhost:9001/data/" + req.session.email , {
    //     email: email
    // }).then((userDetails) => {
    //     name = userDetails.data.name
    // }).catch((error) => {
    //     console.log(error)
    // })
    // console.log(bookmarks);
    res.render("dashboard", {
        name: name,
        email: email,
        bookmarks
    });
});

module.exports = router;