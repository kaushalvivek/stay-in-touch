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

// Connect to DB
const uri = "mongodb+srv://vivekkaushal:dbpassword@cluster0-zv3lg.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const usersRouter = require('./routes/user');
app.use('/api/users', usersRouter);

const friendsRouter = require('./routes/friend');
app.use('/api/friends', friendsRouter);


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

// Start app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});