const mongoose = require('mongoose');
const path = require('path');

const Schema = mongoose.Schema;

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI_KEY;
console.log(MONGO_URI);
console.log(process.env.STATUS);

const recipeSchema = new Schema({
  name: { type: String, required: true },
  liquor: { type: String, required: true },
  ingredients: { type: [String], required: true },
  recipe: { type: [String], required: true },
  instruction: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;
