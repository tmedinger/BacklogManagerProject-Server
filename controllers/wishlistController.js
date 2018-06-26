const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const Wishlist = sequelize.import("../models/wishlist");

router.post("/create", (req, res) => {
    let owner = req.user.id;
    let name = req.body.wishlistGame.name;
    let genre = req.body.wishlistGame.genre;
    let platform = req.body.wishlistGame.platform;

    Wishlist.create({
        name: name,
        genre: genre,
        platform: platform,
        owner: owner
    })
    .then(wishlistGame => res.status(200).json(wishlistGame))
    .catch(err => res.status(500).json({error: err.error[0]
    .message}))
})

router.get("/getall", (req, res) => {
    let userid = req.user.id;

    Wishlist.findAll({ where: { owner: userid } })
    .then(wishlistGame => res.status(200).json(wishlistGame))
    .catch(err => res.status(500).json({error: err.error[0]
    .message}))
})

module.exports = router