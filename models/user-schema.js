const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        index: { unique: true },
        minlength: 7,
        maxlength: 100,
        },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
},{
    versionKey: false
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users