const express = require('express');
const router = express.Router();
const User = require('../models/cred.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// For creating a new user
router.post('/', async (req, res) => {
    try {
        const saltRounds = 10; // Adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = new User({ ...req.body, password: hashedPassword });
        console.log("Data sent:");
        console.log(req.body);
        const result = await user.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error. Create");
    }
});

// For getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error. Get request all");
    }
});

// For getting a single user
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
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
        const result = await User.findByIdAndDelete(id);
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
        const result = await User.findByIdAndUpdate(id, updates, options);
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// Signin route
router.post('/signin', async (req, res) => {
    let token = "";
    try {
        const { emailid, password } = req.body;
        const user = await User.findOne({ emailid });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            
            token = jwt.sign({ _id: user._id }, "Nwesd43jnf3!s@@");
            console.log("Token:",token);

            res.json({ message: 'Authentication successful', role: user.role, token: token });
            
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error. Signin");
    }
});

// For Gettting Mentors:
router.get('/mentors', async (req, res) => {
    try {
        const mentors = await User.find({ role: 'mentor' }, 'FirstName');
        res.send(mentors);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;
