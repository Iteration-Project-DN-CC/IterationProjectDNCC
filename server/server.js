const express = require('express');
const path = require('path');
const cors = require('cors');

const recipeRouter = require('./routers/recipeRouter.js');
const ingredientsRouter = require('./routers/ingredientsRouter.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets
app.get('/dist/bundle.js', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
});

app.get('/images/logo.jpg', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, '../client/Images/logo.jpg'));
});

// Serve main page
app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// Routers
app.use('/recipe', recipeRouter);
app.use('/ingredients', ingredientsRouter);

// 404 handler
app.use('*', (req, res) => {
	res.status(404).send('Generic 404 error: Resource not found!');
});

// Global error handler
app.use((err, req, res, next) => {
	const defaultError = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An unknown error occurred' },
	};
	const errorDetails = Object.assign(defaultError, err);
	console.error(errorDetails.log);
	res.status(errorDetails.status).json(errorDetails.message);
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
