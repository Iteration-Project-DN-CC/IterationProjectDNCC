const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cocktail = require('./models/Cocktail'); // Adjust path as needed

// POST or GET route for filtering cocktails
//extract filter criteria from request body
// Build the filter query dynamically
// Execute the MongoDB query with aggregation
router.post('/api/cocktails/filter', async (req, res) => {
	try {
		const { liquorFilter, ingredientFilters, categoryFilter } = req.body;

		const filterQuery = {};
		if (liquorFilter) filterQuery.liquor = liquorFilter;
		if (ingredientFilters && ingredientFilters.length > 0)
			filterQuery.ingredients = { $all: ingredientFilters };
		if (categoryFilter) filterQuery.category = categoryFilter;

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

		res.json(cocktails);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

const express = require('express');
const app = express();
const filterRoutes = require('./filterRoutes');
// Adjust as needed

app.use(express.json());
app.use('/api', filterRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = router;
