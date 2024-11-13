const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const componentsController = require('../controllers/componentsController.js');

router.get(
	'/components/ingredients',
	componentsController.getIngredients,
	(req, res) => {
		return res.status(200).json({ ingredients: res.locals.ingredientsList });
	}
);

module.exports = router;
