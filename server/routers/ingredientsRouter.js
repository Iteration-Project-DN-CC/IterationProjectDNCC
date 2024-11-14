const express = require('express');
const componentsController = require('../controllers/componentsController.js');

const router = express.Router();
//const mongoose = require('mongoose');

router.get('/ingredients', componentsController.getIngredients, (req, res) => {
	return res.status(200).json(res.locals.ingredientsList);
});

router.get('/categories', componentsController.getCategory, (req, res) => {
	return res.status(200).json(res.locals.categoriesList);
});

router.get('/liquors', componentsController.getLiquor, (req, res) => {
	return res.status(200).json(res.locals.liquorList);
});

router.get('/type', componentsController.getRecipesByType, (req, res) => {
	res.status(200).json({ recipes: res.locals.queryResults });
});

module.exports = router;
