// Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Get environment
require('dotenv').config();

// Create express web app, specify port
const app = express();
const port = process.env.PORT || 5000;

// Necessary specifications for functioning
app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/user');
app.use('/users', usersRouter);

const friendsRouter = require('./routes/friend');
app.use('/friends', friendsRouter);

// Connect to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Start app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});