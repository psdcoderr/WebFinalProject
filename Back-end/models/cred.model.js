const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    phoneno: {
        type: String
    },
    emailid: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['society', 'management', 'mentor'], // Add more roles as needed
        default: 'society' // Set a default role if needed
    }
});

const User = mongoose.model('Credential', UserSchema);

module.exports = User;
