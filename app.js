var path = require('path');
var express = require('express')
var request = require('request');
var app = express()
var options = require('./config.js').info

app.use(express.static(path.join(__dirname, '/')));
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
	var midnanStat,
	midnanView,
	dionStat,
	dionView,
	pixelStat,
	pixelView;
	
	var midnan = {
		url: 'https://api.twitch.tv/kraken/streams/midnan',
		headers: {
			'Client-ID': options.clientId
		}
	}
	request(midnan, function (error, response, body) {
		if (JSON.parse(body).stream != undefined) {
			var base = JSON.parse(body).stream
			var streamid = base._id
			midnanStat = "LIVE"
			midnanView = base.viewers
		} else {
			midnanStat = "OFFLINE"
			midnanView = 0
		}
		var dion = {
			url: 'https://api.twitch.tv/kraken/streams/dioninsanity',
			headers: {
				'Client-ID': options.clientId
			}
		}
		request(dion, function (error, response, body) {
			if (JSON.parse(body).stream != undefined) {
				var base = JSON.parse(body).stream
				var streamid = base._id
				dionStat = "LIVE"
				dionView = base.viewers
			} else {
				dionStat = "OFFLINE"
				dionView = 0
			}
			
			var pixel = {
				url: 'https://api.twitch.tv/kraken/streams/pixelsrealm',
				headers: {
					'Client-ID': options.clientId
				}
			}
			request(pixel, function (error, response, body) {
				if (JSON.parse(body).stream != undefined) {
					var base = JSON.parse(body).stream
					var streamid = base._id
					pixelStat = "LIVE"
					pixelView = base.viewers
				} else {
					pixelStat = "OFFLINE"
					pixelView = 0
				}
				res.render('index.html', {
					midnanStat: midnanStat,
					midnanView: midnanView,
					dionStat: dionStat,
					dionView: dionView,
					pixelStat: pixelStat,
					pixelView: pixelView,
				})
			});
		});
	});
})

app.listen(4000, function () {
	console.log('Running Yucibot info website')
})
