const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
    assignment: String,
    due_date: Date,
    completed: Boolean,
    student_id: { type: Schema.Types.ObjectId, ref: 'Student' },
    feedback_id: { type: Schema.Types.ObjectId, ref: 'Feedback' },
});

module.exports = mongoose.model('Homework', homeworkSchema);