var express = require('express');
var router = express.Router();
var conn = require('../models/connbd');

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Chocolateria', error:false,'menu':false});
});

module.exports = router;
