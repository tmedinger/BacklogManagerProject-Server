const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const User = sequelize.import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/create", (req, res) => {
    let username = req.body.user.username;
    let email = req.body.user.email;
    let pass = req.body.user.password;

    User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(pass, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({id: user.id},
            process.env.JWTSECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: "successfully created",
                sessionToken: token
            });
        },
        createError = (err) => {
            res.send(500, err.message);
        }
    );
});

router.post("/login", (req, res) => {
    User.findOne( { where:{ username: req.body.user.username }})
    .then((user) => {
        if (user) {
            bcrypt.compare(req.body.user.password,
            user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({id: user.id},
                    process.env.JWTSECRET, {expiresIn: 60*60*24 });
                    res.json({
                        user: user,
                        message: "Authentication successful.",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: "Authentication failed."});
                }
            });
        } else {
            res.status(500).send({ error: "Authentication failed." });
        }
    },
    (err) => {
        res.status(501).send({ error: "Authentication failed." });
    }
    );
});

module.exports = router