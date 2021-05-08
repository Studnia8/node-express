const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    title: { type: String, required: [true, 'Field title is empty'] },
    description: { type: String, required: [true, 'Field description is empty'] },
    created: { type: String },
});

module.exports = mongoose.model('News', newSchema);