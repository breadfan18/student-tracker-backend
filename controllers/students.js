const express = require('express');

studentsRouter = express.Router();

const Student = require('../models/student');

// Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('../service-account-credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

// Check if the user is authenticated
async function isAuthenticated(req, res, next) {
    try {
        const token = req.get('Authorization');
        if (!token) throw new Error('No token found, please login');
        const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        if (!user) throw new Error('Something went wrong, invalid token');
        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// SEED DATA
const seedData = [
    {
        uid:  'abc123',
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
        uid:  'def456',
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

// SEED Route
studentsRouter.get('/seed', async (req, res) => {
    // Delete all students
    await Student.deleteMany({});
    // Create new students
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
    console.log(req.body, 'is req body post')
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