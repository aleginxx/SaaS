const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const kafka = require('./config/kafka'); 

const cors = require('cors');

// Initialize Express
const app = express();

// Enable CORS for all routes
app.use(cors());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/creditCardDB';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to creditCardDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });



// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

// Routes
const userRoutes = require('./routes/creditCardRoutes');
app.use('/solveMyProblem/credit-cards', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// console.log(`Kafka Server: ${kafka.kafkaServer}`);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
