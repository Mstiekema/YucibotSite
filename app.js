var path = require('path');
var express = require('express')
var app = express()

app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
	res.render('index.html')
})

app.get('/about', function (req, res) {
	res.render('about.html')
})

app.get('/features', function (req, res) {
	res.render('features.html')
})

app.get('/live', function (req, res) {
	res.render('live.html')
})

app.listen(4000, function () {
	console.log('Running Yucibot info website')
})
