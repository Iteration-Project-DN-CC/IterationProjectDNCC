const express = require('express');

const router = express.Router();

const recipeController = require('../controllers/recipeController.js');

router.get('/', recipeController.getRecipesByLiquor, (req, res) => {
	return res.status(200).json({ recipes: res.locals.queryResults });
});

router.post('/', recipeController.addRecipe, (req, res) => {
	return res
		.status(200)
		.json({
			message: 'created recipe entry',
			created: res.locals.queryResults,
		});
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
