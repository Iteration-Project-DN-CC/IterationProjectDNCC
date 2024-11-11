import { Recipe } from '../models/recipeModel.js';

const deletedDocuments = await Recipe.deleteMany({});
console.log(deletedDocuments);
