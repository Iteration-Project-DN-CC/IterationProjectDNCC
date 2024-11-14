const mongoose = require('mongoose');
const path = require('path');
const models = require('../models/recipeModel.js');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true },
  ingredients: { type: [String] },
  favoriteRecipes: { type: [models.Recipe._id] },
});

const User = mongoose.model('user', userSchema);

module.exports = { User };
