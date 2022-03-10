const express = require('express');

feedbacksRouter = express.Router();

const Feedback = require('../models/feedback');

// SEED DATA
const seedData = [
   // TO DO: Add seed data for feedback
];

feedbacksRouter.get('/seed', async (req, res) => {
    // Delete all feedbacks
    await Feedback.deleteMany({})
    Feedback.create(seedData, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});


// Create/POST a new feedback
feedbacksRouter.post('/', (req, res, next) => {
    const feedback = new Feedback(req.body);
    feedback.save((err, feedback) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(feedback);
    });
})

// Read/GET all feedbacks
feedbacksRouter.get('/', (req, res, next) => {
    Feedback.find((err, feedbacks) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(feedbacks);
    });
});

// Read/GET a single feedback
feedbacksRouter.get('/:id', (req, res, next) => {
    Feedback.findById(req.params.id, (err, feedback) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(feedback);
    });
});

// Update/PUT a single feedback
feedbacksRouter.put('/:id', (req, res, next) => {
    Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, feedback) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(feedback);
    });
});

// Delete/DELETE a single feedback
feedbacksRouter.delete('/:id', (req, res, next) => {
    Feedback.findByIdAndRemove(req.params.id, (err, feedback) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(feedback);
    });
});

// Export the router
module.exports = feedbacksRouter;