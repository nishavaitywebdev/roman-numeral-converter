var express = require('express');
const api = require('./main/NumeralConversionController.js');
const report = require('./main/Analytics.js'); 

var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/romannumeral', (req, res) => api.integerToRoman(req, res));
app.get('/report', (req, res) => res.send(report));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
