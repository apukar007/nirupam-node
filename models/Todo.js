const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    
    createAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Todo', todoSchema);