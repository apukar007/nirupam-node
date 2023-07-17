const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Role', roleSchema);

