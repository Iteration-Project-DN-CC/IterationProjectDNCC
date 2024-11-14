const models = require('../models/recipeModel.js');

const recipeController = {};

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
		console.error('Error in getRecipesByLiquor:', error);
		return next({
			log: 'Error in getRecipesByLiquor',
			status: 500,
			message: { err: 'An error occurred while retrieving recipes by liquor.' },
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
		console.error('Error in addRecipe:', error);
		return next({
			log: 'Error in addRecipe',
			status: 500,
			message: { err: 'An error occurred while adding a recipe.' },
		});
	}
};

recipeController.getRecipesByType = async (req, res, next) => {
	try {
		const { type } = req.params;
		if (!type) {
			return next({
				log: 'No type query param',
				status: 400,
				message: { err: 'Type query parameter is required.' },
			});
		}

		let query;
		switch (type) {
			case 'sour':
				query = {
					$or: [
						{ ingredients: { $regex: '\\blime juice\\b', $options: 'i' } },
						{ ingredients: { $regex: '\\blemon juice\\b', $options: 'i' } },
					],
				};
				break;
			case 'highball': 
				query = {
					$or: [
						{ ingredients: { $regex: '\\bsoda\\b', $options: 'i' } },
						{ ingredients: { $regex: '\\bclub soda\\b', $options: 'i' } },
					],
				};
				break;
			case 'spirit forward':
				query = { ingredients: { $size: 2 } };
				break;
			case 'fizz':
				query = {
					$and: [
						{
							$or: [
								{ ingredients: { $regex: '\\blime\\b', $options: 'i' } },
								{ ingredients: { $regex: '\\blemon\\b', $options: 'i' } },
								{
									ingredients: { $regex: '\\borange juice\\b', $options: 'i' },
								},
								{
									ingredients: {
										$regex: '\\bgrapefruit juice\\b',
										$options: 'i',
									},
								},
							],
						},
						{
							$or: [
								{ ingredients: { $regex: '\\bsoda\\b', $options: 'i' } },
								{ ingredients: { $regex: '\\bchampagne\\b', $options: 'i' } },
							],
						},
					],
				};
				break;
			case 'martini':
				query = { name: { $regex: '\\bmartini\\b', $options: 'i' } };
				break;
			case 'tropical':
				query = { ingredients: { $regex: '\\bpineapple\\b', $options: 'i' } };
				break;
			default:
				return next({
					log: 'Invalid type query param',
					status: 400,
					message: { err: 'Invalid type query parameter.' },
				});
		}

		const data = await models.Recipe.find(query).limit(20);
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

module.exports = recipeController;
