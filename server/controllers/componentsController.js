const models = require('../models/recipeModel.js');

const componentsController = {};

componentsController.getIngredients = async (req, res, next) => {
	try {
		const results = await models.Recipe.aggregate([
			{ $unwind: '$ingredients' },
			{ $project: { normalizedIngredient: { $toLower: '$ingredients' } } },
			{
				$group: {
					_id: null,
					allIngredients: { $addToSet: '$normalizedIngredient' },
				},
			},
			{ $project: { _id: 0, ingredients: '$allIngredients' } },
		]);

		res.locals.ingredientsList = results[0]?.ingredients || [];
		return next();
	} catch (err) {
		console.error('Error in getIngredients:', err);
		return next(res.status(500).json({ error: err.message }));
	}
};

componentsController.getLiquor = async (req, res, next) => {
	try {
		const results = await models.Recipe.aggregate([
			{ $project: { normalizedLiquor: { $toLower: '$liquor' } } },
			{ $group: { _id: null, allLiquors: { $addToSet: '$normalizedLiquor' } } },
			{ $project: { _id: 0, liquors: '$allLiquors' } },
		]);

		res.locals.liquorList = results[0]?.liquors || [];
		return next();
	} catch (err) {
		console.error('Error in getLiquor:', err);
		return next(res.status(500).json({ error: err.message }));
	}
};

componentsController.getCategory = async (req, res, next) => {
	try {
		const { type } = req.query;
		const results = await models.Recipe.find(
			type ? { category: { $regex: type, $options: 'i' } } : {}
		);

		const categoriesArray = [
			...new Set(results.map((item) => item.category.toLowerCase())),
		];
		res.locals.categoriesList = categoriesArray;
		return next();
	} catch (err) {
		console.error('Error in getCategory:', err);
		return next({
			log: 'Error in getCategory',
			status: 500,
			message: { err: 'An error occurred while retrieving categories.' },
		});
	}
};

componentsController.getRecipesByType = async (req, res, next) => {
	try {
		const { type, limit } = req.query;
		if (!type) {
			return next({
				log: 'No type query param',
				status: 400,
				message: { err: 'Type query parameter is required.' },
			});
		}

		let query;
		switch (type.toLowerCase()) {
			case 'sour':
				query = {
					ingredients: { $in: ['lime juice', 'lemon juice', 'orange juice'] },
				};
				break;
			case 'tropical':
				query = { ingredients: { $in: ['pineapple'] } };
				break;
			default:
				return next({
					log: 'Invalid type query param',
					status: 400,
					message: { err: 'Invalid type query parameter.' },
				});
		}

		const data = await models.Recipe.find(query).limit(Number(limit) || 20);
		res.locals.queryResults = data;
		return next();
	} catch (error) {
		console.error('Error in getRecipesByType:', error);
		return next({
			log: 'Error in getRecipesByType',
			status: 500,
			message: { err: 'An error occurred while retrieving recipes by type.' },
		});
	}
};

module.exports = componentsController;
