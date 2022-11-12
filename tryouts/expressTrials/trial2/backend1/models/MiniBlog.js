const mongoose = require('mongoose');

const MBSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'should atleast contain 5 characters']
    },
    excerpt: {
        type: String,
        required: true,
        minLength: [5, 'should atleast contain 5 characters']
    },
    body: {
        type: String,
        required: true,
        minLength: [30, 'should atleast contain 30 characters']
    },
    author: {
        type: String,
        required: true
    }
})

const MiniBlog = mongoose.model('Miniblog', MBSchema);

module.exports = MiniBlog;