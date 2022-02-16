// Instantiate express and other apps
const express = require("express")
const app = express()
require("dotenv").config()
const { PORT = 3001, DATABASE_URL, SECRET } = process.env
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

//Connect with mongo
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

// Setup mongo event listeners
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log(`Mongo Error: ${error.message}`));

// Mount middleware
app.use(cors()) // to prevent cors errors, open access to all origins
app.use(express.json()) // parse json bodies
app.use(morgan("dev")) // logging

// Listener
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))


// THis is a test!