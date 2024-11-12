const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Schema = mongoose.Schema;

const MONGO_URI = process.env.MONGO_URI_KEY;
// the above is referencing a .env file, you need to add it. because it is purposefully not put on git.

// console.log(MONGO_URI);
// console.log(process.env.STATUS);

mongoose
  .connect(MONGO_URI, {
    dbName: 'recipies',
  })
  .then(() => {
    console.log('Connected to Database.');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

const recipeSchema = new Schema({
  name: { type: String, required: true },
  liquor: { type: String, required: true },
  ingredients: { type: [String], required: true },
  recipe: { type: [String], required: true },
  instruction: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: {type: String, required: true}
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = { Recipe };
