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
router.get('/type/:type', recipeController.getRecipesByType, (req, res) => {
	res.status(200).json({ recipes: res.locals.queryResults });
});

module.exports = router;
