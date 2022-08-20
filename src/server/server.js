// Require in modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');

// Require in routes
const loginRouter = require('./routes/loginRouter');
const signupRouter = require('./routes/signupRouter');
const todoRouter = require('./routes/todoRouter');

// Set up server
const app = express();
const PORT = process.env.PORT || 3000;

// Allows you to configure the web API's security and allows other domains to make requests against your web API
app.use(cors());
// Request body parser for post requests except html post form
app.use(express.json());
// Request body parser for html post form
app.use(express.urlencoded({ extended: true }));

/////////////////// MONGO /////////////////////

// Require in User Model to create a new collection in Mongo DB
const UserModel = require('./models/userModel');
const TodoModel = require('./models/todoModel');

// Connect to MONGO DB with link
mongoose.connect(
  'mongodb+srv://thaithangt:marty123@junior-assessment.mpzf1ot.mongodb.net/?retryWrites=true&w=majority',
  // To avoid decprecation warnings
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Logs a message once you connect to database
mongoose.connection.once('open', () => console.log('Connected to database'));

// Send files for main app

app.use('/public', express.static(path.join(__dirname, '../public')));

// redirect send file routes
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../public/login.html'))
);

app.get('/index.js', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.js'))
);

// Routes
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/todo', todoRouter);

app.get('/homepage', (req, res) => {
  console.log('HELLO IM GETTING HOMEPAGE');
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// Catch-all handler
app.use((req, res) => res.status(400).send('Error: Page Not found'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 400,
    msg: { err: 'An error occurred in middleware' },
  };
  const errObj = { ...defaultErr, ...err };
  return res.status(errObj.status).json(errObj.msg);
});

// Listen on port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
