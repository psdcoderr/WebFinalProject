const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    }
});

// Define a pre-save middleware to auto-increment the id field
UserSchema.pre('save', async function (next) {
    try {
        if (!this.isNew) {
            return next();
        }
        const lastUser = await User.findOne().sort({ id: -1 });
        if (lastUser) {
            this.id = lastUser.id + 1;
        } else {
            this.id = 1;
        }
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('Contribution', UserSchema);

module.exports = User;
