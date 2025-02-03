const mongoose = require('mongoose');
const ToDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        defaultValue: false,
    },
});

module.exports = mongoose.model('ToDo', ToDoSchema);