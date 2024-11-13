const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const componentsController = require('../controllers/componentsController.js');

router.get('/ingredients', componentsController.getIngredients, (req, res) => {
	return res.status(200).json(res.locals.ingredientsList);
});

router.get('/categories', componentsController.getCategory, (req, res) => {
	return res.status(200).json(res.locals.categoriesList);
});

router.get('/liquors', componentsController.getLiquor, (req, res) => {
	return res.status(200).json(res.locals.liquorList);
});

module.exports = router;
