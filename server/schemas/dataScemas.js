const mongoose = require('mongoose');
const dataScemas = mongoose.Schema({
    options:{
        type: String,
        required: true,
    },
})
module.exports = dataScemas;