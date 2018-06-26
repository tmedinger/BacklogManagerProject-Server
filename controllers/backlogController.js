const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const Backlog = sequelize.import("../models/backlog");

router.post("/create", (req, res) => {
    let owner = req.user.id;
    let name = req.body.backlogGame.name;
    let genre = req.body.backlogGame.genre;
    let platform = req.body.backlogGame.platform;
    let startedPlaying = req.body.backlogGame.startedPlaying;
    let length = req.body.backlogGame.length;

    Backlog.create({
        name: name,
        genre: genre,
        platform: platform,
        startedPlaying: startedPlaying,
        length: length,
        owner: owner
    })
    .then(backlogGame => res.status(200).json(backlogGame))
    .catch(err => res.status(500).json({error: err.error[0]
    .message}))
})

router.get("/getall", (req,res) => {
    let userid = req.user.id;

    Backlog.findAll({ where: { owner: userid } })
    .then(backlogGame => res.status(200).json(backlogGame))
    .catch(err => res.status(500).json({error: err.error[0]
    .message}))
})

router.put("/update/:id", (req, res) => {
    let data = req.params.id;
    let name = req.body.backlogGame.name;
    let genre = req.body.backlogGame.genre;
    let platform = req.body.backlogGame.platform;
    let startedPlaying = req.body.backlogGame.startedPlaying;
    let length = req.body.backlogGame.length;

    Backlog.update({
        name: name,
        genre: genre,
        platform: platform,
        startedPlaying: startedPlaying,
        length: length,
    },
    {where: {id: data}
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err.errors[0]
    .message}))
})

router.delete("/delete/:id", (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    Backlog.destroy({ where: { id: data, owner: userid } })
    .then(data => res.send("Game deleted.  No one will ever know your shame."))
    .catch(err => res.status(500).json({error: err.errors[0]
    .message}))
})

module.exports = router