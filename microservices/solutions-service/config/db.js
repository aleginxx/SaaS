const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/solutionsDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  connectTimeoutMS: 600000, // Deprecated; use 'connectTimeout' instead
  socketTimeoutMS: 600000,  // Deprecated; use 'socketTimeout' instead
})
.then(() => {
  mongoose.set('connectTimeout', 600000); // 10 minutes
  mongoose.set('socketTimeout', 600000);  // 10 minutes

  console.log('Connected to solutionsDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

module.exports = mongoose;
