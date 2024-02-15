var express = require('express');
const api = require('./IntegerToRomanController.js');

var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/romannumeral', (req, res) => api.integerToRoman(req, res));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});