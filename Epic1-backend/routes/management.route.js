const express = require('express');
const router = express.Router();
const Management = require('../models/management.model');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await Management.find();
        res.send(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// For creating a new user
router.post('/', async (req, res) => {
    try {
        const lastSociety = await Management.findOne().sort({ id: -1 });
        let newId = 1;
        if (lastSociety && !isNaN(lastSociety.id)) {
            newId = lastSociety.id + 1;
        }
        req.body.id = newId;
        const user = new Management(req.body);
        const result = await user.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});


// For getting a single user
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Management.findOne({ id });
        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// For deleting a single user
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Management.findOneAndDelete({ id });
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// For updating a single user
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updates = req.body;
        const options = { new: true };
        const result = await Management.findOneAndUpdate({ id }, updates, options);
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
