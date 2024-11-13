const models = require('../models/recipeModel.js');

const componentsController = {};

componentsController.getIngredients = async (req, res, next) => {
	console.log('We are in getIngredients middleware');

	try {
		//Query for ingredients

		const results = await Cocktail.aggregate([
			{ $unwind: '$ingredients' }, // Deconstruct ingredients array
			{
				$group: {
					_id: null, // Grouping everything together
					allIngredients: { $addToSet: '$ingredients' }, //Remove duplicates
				},
			},
			{
				$project: {
					_id: 0, // Do not include the id field
					ingredients: { $setUnion: ['$allIngredients', []] }, // Join all result ingredients in one result array
				},
			},
		]);

		console.log('this is our results: ', results);
		res.locals.ingredientsList = results;
		return next();
	} catch (err) {
		return next(res.status(500).json({ error: err.message }));
	}
};
/*
componentsController.getLiquor = async (req, res, next) => {
	console.log('We are in getIngredients middleware');
	// add logic here to query
};

componentsController.getCategory = async (req, res, next) => {
	console.log('We are in getIngredients middleware');
	// add logic here to query
};

// POST or GET route for filtering cocktails
//extract filter criteria from request body
// Build the filter query dynamically
// Execute the MongoDB query with aggregation
router.get('/', async (req, res) => {
	console.log('attempting to query for ingredients');
	try {
		// Need to make sure we are sending req body with correct keys
		// LiquorFilter: string
		// IngredientsFilter: array of string
		// categoryFilter: string
		// individual ingredients are capitalized (ex: Vodka, Ice, Sugar)
		// liquor is all lowercase (ex: vodka, tequila)
		// Category is capitalized (ex: Cocktail)

		const { liquorFilter, ingredientFilters, categoryFilter } = req.body;
		console.log(liquorFilter, ingredientFilters, categoryFilter);

		//building filter query
		const filterQuery = {};
		if (liquorFilter) filterQuery.liquor = liquorFilter;
		if (ingredientFilters && ingredientFilters.length > 0)
			filterQuery.ingredients = { $all: ingredientFilters };
		if (categoryFilter) filterQuery.category = categoryFilter;

		//Aggregation pipeline
		const cocktails = await Cocktail.aggregate([
			{ $match: filterQuery },
			{ $unwind: '$ingredients' },
			{
				$group: {
					_id: '$_id',
					name: { $first: '$name' },
					liquor: { $first: '$liquor' },
					ingredients: { $addToSet: '$ingredients' },
					recipe: { $first: '$recipe' },
					instruction: { $first: '$instruction' },
					description: { $first: '$description' },
					image: { $first: '$image' },
					category: { $first: '$category' },
				},
			},
			{ $sort: { name: 1 } },
		]);
		console.log('this is our results: ', cocktails);
		res.json(cocktails);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

*/
