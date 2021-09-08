const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('users', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    discord_id: {
        type: String,
        required: true,
        trim: true
    },
    submissions: [
        {challenge_id: {type:String}, challenge_name: {type:String}, submission: {link:{type:String}, level: {type:String}}}
    ]
});


module.exports = User