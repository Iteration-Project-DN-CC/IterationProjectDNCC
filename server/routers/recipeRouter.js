const express = require('express');
const recipeController = require('../controllers/recipeController.js');

const router = express.Router();

router.get('/', recipeController.getRecipesByLiquor, (req, res) => {
	res.status(200).json({ recipes: res.locals.queryResults });
});

router.post('/', recipeController.addRecipe, (req, res) => {
	res.status(200).json({
		message: 'Created recipe entry',
		created: res.locals.queryResults,
	});
});

// Route to handle fetching recipes by type
// The /type/:type route is ideal for cases where the cocktail type is a required piece of information, and it keeps the URL structure clean and RESTful.
router.get('/type/:type', recipeController.getRecipesByType, (req, res) => {
	res.status(200).json({ recipes: res.locals.queryResults });
});

// NEWLY ADDED ROUTER TO HANDLE QUERYING BY RECIPE
router.post(
  '/findByIngredient',
  recipeController.getRecipesByIngredients,
  (req, res) => {
    return res.status(200).json({ recipes: res.locals.queryResults });
  }
);

module.exports = router;
