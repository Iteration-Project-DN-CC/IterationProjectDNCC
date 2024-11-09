const express = require('express');
const app = express();
const path = require('path');

app.get('/dist/bundle.js', (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
});

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
//
app.use('/', (req, res, next) => {
  res.status(404).send(' you got a generic 404, thats an error!');
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
