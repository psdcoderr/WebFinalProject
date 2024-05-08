const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentorSchema = new Schema({
    Contributions: {
        type: String
    },
    Points: {
        type: String
    },
    Society: {
        type: String
    },
    Status: {
        type: String
    }
});

const Mentor = mongoose.model('Mentor', MentorSchema);

module.exports = Mentor;
