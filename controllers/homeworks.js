const express = require('express');

homeworksRouter = express.Router();

const Homework = require('../models/homework');

// SEED DATA
const seedData = [
    // TO DO: Add seed data for homework
];

homeworksRouter.get('/seed', async (req, res) => {
    // Delete all homeworks
    await Homework.deleteMany({})
    Homework.create(seedData, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});


// Create/POST a new homework
homeworksRouter.post('/', (req, res, next) => {
    const homework = new Homework(req.body);
    homework.save((err, homework) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(homework);
    });
})

// Read/GET all homeworks
homeworksRouter.get('/', (req, res, next) => {
    Homework.find((err, homeworks) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(homeworks);
    });
});

// Read/GET a single homework
homeworksRouter.get('/:id', (req, res, next) => {
    Homework.findById(req.params.id, (err, homework) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(homework);
    });
});

// Update/PUT a single homework
homeworksRouter.put('/:id', (req, res, next) => {
    Homework.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, homework) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(homework);
    });
});

// Delete/DELETE a single homework
homeworksRouter.delete('/:id', (req, res, next) => {
    Homework.findByIdAndRemove(req.params.id, (err, homework) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(homework);
    });
});

// Export the router
module.exports = homeworksRouter;