const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    comment: String,
    homework_id: { type: Schema.Types.ObjectId, ref: 'Homework' },
    student_id: { type: Schema.Types.ObjectId, ref: 'Student' },
    instructor_id: { type: Schema.Types.ObjectId, ref: 'Instructor' },
});

module.exports = mongoose.model('Feedback', feedbackSchema);