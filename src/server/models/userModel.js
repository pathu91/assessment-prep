// require in mongoose
const mongoose = require('mongoose');

// storing mongoose.Schema method (to create an instance of a schema) in 'Schema' variable for better readability
const Schema = mongoose.Schema;

// creating new instance of Schema and storing under 'UserSchema' variable
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a model based on the UserSchema and storing it under
const User = mongoose.model('User', UserSchema);

module.exports = User;
