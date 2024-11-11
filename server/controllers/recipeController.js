const models = require('../models/recipeModel.js');

const recipeController = {};

// Get all recipes

// Get Recipe by liquor name
recipeController.getRecipesByLiquor = async (req, res, next) => {
  // get params
  console.log(req.query);
  let { liquor, limit } = req.query;
  console.log('Liquor type: ', liquor);
  if (!liquor) {
    return next({
      log: 'no liquor query param',
      status: 400,
      message: { err: 'server says: you have to specify a liquor query parameter.' },
    });
  }
  if (!limit) {
    limit = 20;
  }

  // Logic to fetch
  try {
    const data = await models.Recipe.find({ liquor: liquor }).limit(limit).exec();
    console.log('Data: ', data);
    // const data = await response.json();
    // console.log(data);
    res.locals.queryResults = data;
    return next();
  } catch (error) {
    return next({
      log: 'Error in recipeController.getAllRecipes' + error,
      status: 500,
      message: { err: 'An error occurred while retrieving characters.' },
    });
  }
};

recipeController.addRecipe = async (req, res, next) => {
  // get params
  console.log('REQ BODY: ', req.body);
  let { name, liquor, ingredients, recipe, instruction, description, image } = req.body;

  if (!name || !liquor || !ingredients || !recipe || !instruction || !description || !image) {
    return next({
      log: 'Fields are missing',
      status: 400,
      message: { err: 'server says: you have to specify a body with the proper fields.' },
    });
  }

  const dbFields = {
    name, // name:name
    liquor,
    ingredients,
    recipe,
    instruction,
    description,
    image,
  };

  // Logic to fetch
  try {
    const data = await models.Recipe.create(dbFields);
    console.log('Data: ', data);
    res.locals.queryResults = data;
    return next();
  } catch (error) {
    return next({
      log: 'Error in recipeController.addRecipe: ' + error,
      status: 500,
      message: { err: 'An error occurred while adding a recipe.' },
    });
  }
};

module.exports = recipeController;
