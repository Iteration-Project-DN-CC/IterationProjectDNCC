const models = require('../models/recipeModel.js'); // Declare models only once

const componentsController = {}; // Declare componentsController only once

componentsController.getIngredients = async (req, res, next) => {
  try {
    // Query for ingredients
    const results = await models.Recipe.aggregate([
      { $unwind: '$ingredients' }, // Deconstruct ingredients array
      {
        $project: {
          // Normalize the ingredient names to lowercase to eliminate case sensitivity
          normalizedIngredient: { $toLower: '$ingredients' },
        },
      },
      {
        $group: {
          _id: null, // Grouping everything together
          allIngredients: { $addToSet: '$normalizedIngredient' }, // Remove duplicates
        },
      },
      {
        $project: {
          _id: 0, // Do not include the id field
          ingredients: { $setUnion: ['$allIngredients', []] }, // Join all result ingredients in one result array
        },
      },
    ]);

    const ingredientsArray = results[0].ingredients;
    // Result is an array of all lowercase ingredients
    res.locals.ingredientsList = ingredientsArray;
    return next();
  } catch (err) {
    return next(res.status(500).json({ error: err.message }));
  }
};

componentsController.getLiquor = async (req, res, next) => {
  console.log('We are in getLiquor middleware');
  try {
    // Query for liquors
    const results = await models.Recipe.aggregate([
      {
        $project: {
          // Normalize the liquor names to lowercase to eliminate case sensitivity
          normalizedLiquor: { $toLower: '$liquor' },
        },
      },
      {
        $group: {
          _id: null, // Grouping everything together
          allLiquors: { $addToSet: '$normalizedLiquor' }, // Remove duplicates
        },
      },
      {
        $project: {
          _id: 0, // Do not include the id field
          liquors: { $setUnion: ['$allLiquors', []] }, // Join all result liquors in one result array
        },
      },
    ]);

    const liquorArray = results[0].liquors;
    // Result is an array of all lowercase liquors
    res.locals.liquorList = liquorArray;
    return next();
  } catch (err) {
    return next(res.status(500).json({ error: err.message }));
  }
};

componentsController.getCategory = async (req, res, next) => {
  console.log('We are in getCategory middleware');
  try {
    const { type } = req.query; // Extract type from query parameters

    // Query the database for matching categories
    const results = await models.Recipe.find(
      type
        ? { category: { $regex: type, $options: 'i' } } // Case-insensitive search if type provided
        : {} // Otherwise return all categories
    );

    // Transform results into a unique list of categories
    const categoriesArray = [
      ...new Set(results.map((item) => item.category.toLowerCase())),
    ];

    res.locals.categoriesList = categoriesArray; // Save categories to res.locals
    return next();
  } catch (err) {
    return next({
      log: 'Error in componentsController.getCategory: ' + err,
      status: 500,
      message: { err: 'An error occurred while retrieving categories.' },
    });
  }
};

module.exports = componentsController; // Export componentsController
