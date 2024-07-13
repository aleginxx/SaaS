const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const kafka = require('./config/kafka'); 
const app = express();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/toolsDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to toolsDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());


// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

// Routes
const userRoutes = require('./routes/toolRoutes');
app.use('/solveMyProblem/tools', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// console.log(`Kafka Server: ${kafka.kafkaServer}`);

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
