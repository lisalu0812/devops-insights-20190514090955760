
var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var request = REQUEST.defaults( {
    strictSSL: false
});

//COMPX341-19 A3 VERSION 1
var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric";

exports.getWeather = function(req, res) {
	var zip = req.query.zip;
	var aurl;
	if( (zip === null) || (typeof(zip) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}else {
		aurl = OPENWEATHERURL + '&q=' + zip + ',nz';
	}


	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var lat = body.coord.lat;
    			var lon = body.coord.lon;
    			var response = {city: body.name, weather: weath, la: lat, lo: lon};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);

exports.getWeatherByLatLng = function(req, res) {
	var latlng = req.query.lat;
	if ((latlng === null) || (typeof(latlng) === 'undefined')) {
		return res.status(400).send('latlng missing');
	}
	var aurl = OPENWEATHERURL + '&lat=' + req.query.lat +'&lon='+req.query.lon;
	request ({
		method: "GET",
		url:aurl,
		json:true
	},function (err,resp,body){
		if(err) {
			res.status(400).send('Failed to get the data');
		} else {
			if(body.cod === 200) {
				var weath = "Conditions are "+body.weather[0].main + " and temperature is "+ body.main.temp + ' C';
				var response = {city: body.name, weather: weath};
				return res.status(200).send(response);
			}else {
				return res.status(400).send({msg:'Failed'});
			}
		}
	});
};
router.get('/getWeatherByLatLng', exports.getWeatherByLatLng);
/*
exports.getWeather2 = function(req, res) {
	var zip = req.query.zip;
	if( (zip === null) || (typeof(zip) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}

	var aurl = OPENWEATHERURL + '&q=' + zip + ',nz';

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {city: body.name, weather: weath};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather2', exports.getWeather2);*/


exports.router = router;
