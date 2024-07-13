const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const kafka = require('./config/kafka'); 
const app = express();
const path = require('path');

const cors = require('cors');
// Enable CORS for all routes
app.use(cors());
app.use('/solveMyProblem', express.static(path.join(__dirname, '..', '..', 'front-end')));

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/userDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to userDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/solveMyProblem/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// console.log(`Kafka Server: ${kafka.kafkaServer}`);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
