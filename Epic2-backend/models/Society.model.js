const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocietySchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    Contributions: {
        type: String
    },
    Points: {
        type: String
    },
    Society: {
        type: String
    },
    Mentor: {
        type: String
    },
    Status: {
        type: String,
        default: "Not Active"
    },
    Note: {
        type: String
    }
});

// Define a pre-save middleware to auto-increment the id field
SocietySchema.pre('save', async function (next) {
    try {
        if (!this.isNew) {
            return next();
        }
        const lastSociety = await Society.findOne().sort({ id: -1 });
        if (lastSociety) {
            this.id = lastSociety.id + 1;
        } else {
            this.id = 1;
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Society = mongoose.model('Society', SocietySchema);

module.exports = Society;
