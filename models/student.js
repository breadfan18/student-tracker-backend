const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    uid: String,
    displayName: String,
    email: { type: String, unique: true, required: true },
    computer_info: { type: String, default: "" },
    // enrollment_date: { type: Date, default: "" },
    enrollment_status: { type: String, default: 'active' },
    absences: { type: Number, default: 0 },
    tardies: { type: Number, default: 0 },
    onTrackToPass: { type: Boolean, default: true },
    github_username: { type: String, default: "" },
    enterprise_username: { type: String, default: "" },
    homework_completion_percentage: { type: Number, default: 0 },
});

module.exports = mongoose.model('Student', studentSchema);