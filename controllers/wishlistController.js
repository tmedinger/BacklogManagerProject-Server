const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const Wishlist = sequelize.import("../models/wishlist");

router.post("/create", (req, res) => {
    let owner = req.user.id;
    let name = req.body.wishlistGame.name;
    let genre = req.body.wishlistGame.genre;
    let platform = req.body.wishlistGame.platform;
    let interest = req.body.wishlistGame.interest;

    Wishlist.create({
        name: name,
        genre: genre,
        platform: platform,
        interest: interest,
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

router.put("/update/:id", (req, res) => {
    let data = req.params.id;
    let name = req.body.wishlistGame.name;
    let genre = req.body.wishlistGame.genre;
    let platform = req.body.wishlistGame.platform;
    let interest = req.body.wishlistGame.interest;

    Wishlist.update({
        name: name,
        genre: genre,
        platform: platform,
        interest: interest
    },
    {where: {id: data}
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err.error[0]
    .message}))
})

router.delete("/delete/:id", (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    Wishlist.destroy({ where: { id: data, owner: userid } })
    .then(data => res.send("Game deleted.  You didn't really need to make your backlog any worse anyway."))
    .catch(err => res.status(500).json({error: err.errors[0]
    .message}))
})

module.exports = router