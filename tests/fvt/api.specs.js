
(function () {

    'use strict';

    var apiv1 = require('../../routes/apiv1');
    var assert = require('chai').assert;
    var REQUEST = require('request');

    var request = REQUEST.defaults( {
        strictSSL: false
    });

    var appUrl = process.env.APP_URL;
    console.log(appUrl); //version 2

    describe('Get Weather', function() {

    	it('with valid name', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?zip=hamilton'
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert((pbody.city === 'Hamilton'), "City name does not match");
              done();
            }
        });
    	});

      it('without name', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather'
          }, /* @callback */ function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 400);
              done();
            }
        });
    	});

      it('with another valid name', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?zip=Auckland'
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert(pbody.city === 'Auckland', "City name does not match");
              done();
            }
        });
    	});
    });
    
    //Test latLng
    describe ('Get weather by latLng',function(){
    	var lat = -36.8485;
    	var lon = 174.7633;
    	var latlng = lat + "&lon=" + lon;
    	it('with valid latlng',function(done){
    		if(!appUrl){
    			assert.fail("Environment variable APP_URL is not defined");
    			return done();
    		}
    		request({
    			method:'GET',
    			url: appUrl + '/api/v1/getWeatherByLatLng?lat='+latlng
    		},function(err,resp,body){
    			if(err){
    				assert.fail('Failed to get the response');
    			}
    			else{
    				assert.equal(resp.statusCode,200);
    				var pbody = JSON.parse(body);
    				assert(pbody.city ==='Auckland',"City name does not match");
    				done();
    			}
    		});
    	});
    	it('without latlng', function(done){
    		if(!appUrl) {
    			assert.fail("Environment variable APP_URL is not defined");
    			return done();
    		}
    		request ({
    			method:'GET',
    			url:appUrl + '/api/v1/getWeatherByLatLng?lat='
    		},function(err,resp,body){
    			if(err){
    				assert.fail('Failed to get the response');
    			}
    			else{
    				assert.equal(resp.statusCode, 400);
    				done();
    			}
    		});
    	});
    	it ('with another latLng', function(done){
    		if(!appUrl){
    			assert.fail("Environment variable APP_URL is not defined");
    			return done();
    		}
    		request ({
    			method: 'GET',
    			url: appUrl + '/api/v1/getWeatherByLatLng?lat=' + latlng
    		}, function(err, resp, body){
    			if(err){
    				assert.fail('Failed to get the response');
    			}
    			else {
    				assert.equal(resp.statusCode,200);
    				var pbody = JSON.parse(body);
    				assert(pbody.city === 'Auckland',"City name does not match");
    				done();
    			}
    		});
    	});
    });
})();
