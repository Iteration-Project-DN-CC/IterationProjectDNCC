const models = require('../models/recipeModel.js');

const recipeController = {};

// Get Recipes by Liquor
recipeController.getRecipesByLiquor = async (req, res, next) => {
	try {
		const { liquor, limit } = req.query;
		if (!liquor) {
			return next({
				log: 'No liquor query param',
				status: 400,
				message: { err: 'Liquor query parameter is required.' },
			});
		}

		const data =
			liquor === 'any'
				? await models.Recipe.find().limit(Number(limit) || 20)
				: await models.Recipe.find({ liquor }).limit(Number(limit) || 20);

		res.locals.queryResults = data;
		return next();
	} catch (error) {
		return next({
			log: 'Error in recipeController.getRecipesByLiquor: ' + error,
			status: 500,
			message: { err: 'An error occurred while retrieving recipes by liquor.' },
		});
	}
};

// Get Recipes by Type
recipeController.getRecipesByType = async (req, res, next) => {
	try {
		const { type, limit } = req.query;
		if (!type) {
			return next({
				log: 'No type query param',
				status: 400,
				message: { err: 'Type query parameter is required.' },
			});
		}

		const data = await models.Recipe.find({
			category: { $regex: type, $options: 'i' },
		}).limit(Number(limit) || 20);

		res.locals.queryResults = data;
		return next();
	} catch (error) {
		return next({
			log: 'Error in recipeController.getRecipesByType: ' + error,
			status: 500,
			message: { err: 'An error occurred while retrieving recipes by type.' },
		});
	}
};

recipeController.addRecipe = async (req, res, next) => {
	try {
		const {
			name,
			liquor,
			ingredients,
			recipe,
			instruction,
			description,
			image,
		} = req.body;

		if (
			!name ||
			!liquor ||
			!ingredients ||
			!recipe ||
			!instruction ||
			!description ||
			!image
		) {
			return next({
				log: 'Missing fields in request body',
				status: 400,
				message: { err: 'All fields are required.' },
			});
		}

		const newRecipe = {
			name,
			liquor,
			ingredients,
			recipe,
			instruction,
			description,
			image,
		};
		const data = await models.Recipe.create(newRecipe);

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
