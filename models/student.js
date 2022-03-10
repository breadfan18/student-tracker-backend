const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    email: String,
    computer_info: String,
    enrollment_date: Date,
    enrollment_status: String,
    absences: Number,
    tardies: Number,
    onTrackToPass: Boolean,
    github_username: String,
    enterprise_username: String,
    homework_completion_percentage: Number,
});

module.exports = mongoose.model('Student', studentSchema);