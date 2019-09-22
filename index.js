// Load the http module to create an http server.
var express = require('express');
var path = require('path');
var convert = require('convert-units');
var bodyParser = require('body-parser');

var rawJson;
var pageViews = 0;
var app = express();

app.set('views', __dirname + '/html');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());

app.get('/', function(req, res) {
    pageViews++;
    res.render('index.html', {'pageViews': pageViews});
}).use(express.static(path.join(__dirname, '/public')));

app.post('/solve', function(req, res) {
    rawJson = req.body;
    console.log(JSON.stringify(rawJson));
    res.render('sol.html', {'sol': convert(parseFloat(rawJson["num"])).from(rawJson["unit1"]).to(rawJson["unit2"])});
});

app.listen(8000, '127.0.0.1')
console.log("Server running at http://127.0.0.1:8000/"); 