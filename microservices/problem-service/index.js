const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/problemDB';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => {
    console.log('Connected to problemDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });
  

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

// Routes
const problemRoutes = require('./routes/problemRoutes');
app.use('/solveMyProblem/problems', problemRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
