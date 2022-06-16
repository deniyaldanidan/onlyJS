const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    },
    profession: {
        type: String,
        required: true
    }
});

const PeopleModel = mongoose.model('People', peopleSchema);

module.exports = PeopleModel;