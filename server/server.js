const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const app = express();

// Connect to MongoDB
const db = config.get('mongoURI');
mongoose.connect(db).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));