const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    uid: String,
    name: String,
    email: String,
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model('Instructor', instructorSchema);