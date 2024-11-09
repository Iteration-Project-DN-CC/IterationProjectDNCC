const express = require('express');
const app = express();
const path = require('path');

const recipeRouter = require('./routers/recipeRouter.js');

app.get('/dist/bundle.js', (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
});

app.use('/recipe', topLog, recipeRouter);
function topLog(req, res, next) {
  console.log('ok you got here');
  next();
}

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
//
app.use('/', (req, res, next) => {
  res.status(404).send(' you got a generic 404, thats an error!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000...');
}); //listens on port 3000 -> http://localhost:3000/
