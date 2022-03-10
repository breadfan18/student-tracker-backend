const express = require('express');

instructorsRouter = express.Router();

const Instructor = require('../models/instructor');

// SEED DATA
const seedData = [
    {
        name: 'Instructor 1',
        email: 'instructor1@email.com',
        students: [],
    },
    {
        name: 'Instructor 2',
        email: 'instructor2@email.com',
        students: [],
    }
];

instructorsRouter.get('/seed', async (req, res) => {
    // Delete all instructors
    await Instructor.deleteMany({})
    Instructor.create(seedData, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});


// Create/POST a new instructor
instructorsRouter.post('/', (req, res, next) => {
    const instructor = new Instructor(req.body);
    instructor.save((err, instructor) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(instructor);
    });
})

// Read/GET all instructors
instructorsRouter.get('/', (req, res, next) => {
    Instructor.find((err, instructors) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(instructors);
    });
});

// Read/GET a single instructor
instructorsRouter.get('/:id', (req, res, next) => {
    Instructor.findById(req.params.id, (err, instructor) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(instructor);
    });
});

// Update/PUT a single instructor
instructorsRouter.put('/:id', (req, res, next) => {
    Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, instructor) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(instructor);
    });
});

// Delete/DELETE a single instructor
instructorsRouter.delete('/:id', (req, res, next) => {
    Instructor.findByIdAndRemove(req.params.id, (err, instructor) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(instructor);
    });
});

// Export the router
module.exports = instructorsRouter;