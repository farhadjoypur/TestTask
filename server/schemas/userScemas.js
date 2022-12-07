const mongoose = require('mongoose');
const userScemas = mongoose.Schema({
    checked:{
        type: Boolean,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    optionValue:{
        type: [],
        required: true,
    },
})
module.exports = userScemas;