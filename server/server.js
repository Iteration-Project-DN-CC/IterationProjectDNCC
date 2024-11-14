const express = require('express');
const path = require('path');
const cors = require('cors');

const recipeRouter = require('./routers/recipeRouter.js');
const ingredientsRouter = require('./routers/ingredientsRouter.js');
const userRouter = require('./routers/userRouter.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// send the bundle file if requested(in production)
app.get('/dist/bundle.js', (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
});

// app.get('/dist/bundle.js', (req, res) => {
// 	res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
// });

// since we only have one image, using static is unnessesary.
app.get('/images/logo.jpg', (req, res, next) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/Images/logo.jpg'));
});

// app.get('/images/logo.jpg', (req, res) => {
// 	res.status(200).sendFile(path.join(__dirname, '../client/Images/logo.jpg'));
// });

// enable hits to /recipe
app.use('/recipe', recipeRouter);

// hit ingredients router
app.use('/ingredients', ingredientsRouter);

//hit users router (get/post)
app.use('/user', userRouter);

// ser main page
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// app.get('/', (req, res) => {
// 	res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
// });

// app.use('/recipe', recipeRouter);
// app.use('/ingredients', ingredientsRouter);

//
app.use('/', (req, res, next) => {
  res.status(404).send(' you got a generic 404, thats an error!')
});

// 404 handler
// app.use('*', (req, res) => {
// 	res.status(404).send('Generic 404 error: Resource not found!');

// Global error handler
app.use((err, req, res, next) => {

  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An uNkNoWn error occurred' },
  };
  const errObj = Object.assign(defaultError, err);
  console.error(errObj.log);
  return res.status(errObj.status).send(JSON.stringify(errObj.message));

	// const defaultError = {
	// 	log: 'Express error handler caught unknown middleware error',
	// 	status: 500,
	// 	message: { err: 'An unknown error occurred' },
	// };
	// const errorDetails = Object.assign(defaultError, err);
	// console.error(errorDetails.log);
	// res.status(errorDetails.status).json(errorDetails.message);

});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
