const mongoose = require('mongoose')
const validator = require('validator')

const Challenge = mongoose.model('challenges', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    categories: {
        type: Array,
        required: true,
        trim: true
    },
    deadlines: {
        type: String,
        required: true,
        trim: true
    },
    submissions:{
        type: Array,
        required: true,
    }
});


module.exports = Challenge