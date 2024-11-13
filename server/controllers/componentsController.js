const models = require('../models/recipeModel.js');

const componentsController = {};

componentsController.getIngredients = async (req, res, next) => {
	try {
		//Query for ingredients
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
	// add logic here to query
	try {
		//Query for ingredients
		const results = await models.Recipe.aggregate([
			// { $unwind: '$ingredients' }, // Deconstruct ingredients array
			{
				$project: {
					// Normalize the ingredient names to lowercase to eliminate case sensitivity
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
					liquors: { $setUnion: ['$allLiquors', []] }, // Join all result ingredients in one result array
				},
			},
		]);

		const liquorArray = results[0].liquors;
		// Result is an array of all lowercase ingredients
		res.locals.liquorList = liquorArray;
		return next();
	} catch (err) {
		return next(res.status(500).json({ error: err.message }));
	}
};

componentsController.getCategory = async (req, res, next) => {
	console.log('We are in getCategory middleware');
	// add logic here to query
	try {
		//Query for ingredients
		const results = await models.Recipe.aggregate([
			// { $unwind: '$ingredients' }, // Deconstruct ingredients array
			{
				$project: {
					// Normalize the ingredient names to lowercase to eliminate case sensitivity
					normalizedCategory: { $toLower: '$category' },
				},
			},
			{
				$group: {
					_id: null, // Grouping everything together
					allCategories: { $addToSet: '$normalizedCategory' }, // Remove duplicates
				},
			},
			{
				$project: {
					_id: 0, // Do not include the id field
					categories: { $setUnion: ['$allCategories', []] }, // Join all result ingredients in one result array
				},
			},
		]);

		const categoriesArray = results[0].categories;
		// Result is an array of all lowercase ingredients
		res.locals.categoriesList = categoriesArray;
		return next();
	} catch (err) {
		return next(res.status(500).json({ error: err.message }));
	}
};

module.exports = componentsController;
