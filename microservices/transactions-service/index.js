const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
// const kafka = require('./config/kafka'); 


// Initialize Express
const app = express();

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/transactionDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to transactionDB'))
.catch(err => console.error('MongoDB connection error:', err));


// Routes
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/solveMyProblem/transactions', transactionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// console.log(`Kafka Server: ${kafka.kafkaServer}`);

// Start server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
