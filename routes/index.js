var express = require('express');
var router = express.Router();
var conn = require('../models/connbd');

module.exports = function(security) {

	router.get('/', security, function(req, res, next) { 
		  res.render('index', { title: 'Chocolateria Brasileira', error:false,'menu':false});
	});

  return router;
}