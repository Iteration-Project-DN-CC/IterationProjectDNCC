const express = require('express');
const recipeController = require('../controllers/recipeController.js');

const router = express.Router();

router.get('/', recipeController.getRecipesByLiquor, (req, res) => {
	return res.status(200).json({ recipes: res.locals.queryResults });
});

router.get('/type', recipeController.getRecipesByType, (req, res) => {
	return res.status(200).json({ recipes: res.locals.queryResults });
});

router.post('/', recipeController.addRecipe, (req, res) => {
	return res.status(200).json({
		message: 'Created recipe entry',
		created: res.locals.queryResults,
	});
});

module.exports = router;
