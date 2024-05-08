const express = require('express');
const router = express.Router();
const Management = require('../models/Society.model');

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
        if (lastSociety) {
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

// For getting a single user by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Management.findOne({ id: id });
        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// For deleting a single user by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Management.findOneAndDelete({ id: id });
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// For updating a single user by ID
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updates = req.body;
        const options = { new: true };
        const result = await Management.findOneAndUpdate({ id: id }, updates, options);
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// Custom route to delete a user by Contribution, Society, and Mentor
router.delete('/deleteByCriteria', async (req, res) => {
    const { Contribution, Society, Mentor } = req.body;
    try {
        const result = await Management.deleteOne({ Contribution, Society, Mentor });
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
