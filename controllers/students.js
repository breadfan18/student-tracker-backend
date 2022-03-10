const express = require('express');

studentsRouter = express.Router();

const Student = require('../models/student');

// SEED DATA
const seedData = [
    {
        name: 'John Doe',
        email: 'john@email.com',
        computer_info: 'Macbook Pro',
        enrollment_date: '2019-01-01',
        enrollment_status: 'active',
        absences: 0,
        tardies: 0,
        onTrackToPass: true,
        github_username: 'johndoe',
        enterprise_username: 'johndoe',
        homework_completion_percentage: 80,
    },
    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        computer_info: 'Macbook Pro',
        enrollment_date: '2019-01-01',
        enrollment_status: 'active',
        absences: 0,
        tardies: 0,
        onTrackToPass: true,
        github_username: 'janedoe',
        enterprise_username: 'janedoe',
        homework_completion_percentage: 80,
    }
];

studentsRouter.get('/seed', (req, res) => {
    // Delete all students
    Student.deleteMany({})
    Student.create(seedData, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});


// Create/POST a new student
studentsRouter.post('/', (req, res, next) => {
    const student = new Student(req.body);
    student.save((err, student) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(student);
    });
})

// Read/GET all students
studentsRouter.get('/', (req, res, next) => {
    Student.find((err, students) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(students);
    });
});

// Read/GET a single student
studentsRouter.get('/:id', (req, res, next) => {
    Student.findById(req.params.id, (err, student) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(student);
    });
});

// Update/PUT a single student
studentsRouter.put('/:id', (req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, student) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(student);
    });
});

// Delete/DELETE a single student
studentsRouter.delete('/:id', (req, res, next) => {
    Student.findByIdAndRemove(req.params.id, (err, student) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(student);
    });
});

// Export the router
module.exports = studentsRouter;