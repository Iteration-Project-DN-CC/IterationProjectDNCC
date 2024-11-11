const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors());

const recipeRouter = require('./routers/recipeRouter.js');

app.use('/', express.json());


        
// send the bundle file if requested(in production)
app.get('/dist/bundle.js', (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
});

// since we only have one image, using static is unnessesary.
app.get('/images/logo.jpg', (req, res, next) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/Images/logo.jpg'));
});

// enable hits to /recipe
app.use('/recipe', recipeRouter);
// serb main page
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
//
app.use('/', (req, res, next) => {
  res.status(404).send(' you got a generic 404, thats an error!');
});


app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An uNkNoWn error occurred' },
  };
  const errObj = Object.assign(defaultError, err);
  console.error(errObj.log);
  return res.status(errObj.status).send(JSON.stringify(errObj.message));
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
