var express = require('express');
var router = express.Router();
var conn = require('../models/connbd');


module.exports = function(security) {

	router.get('/', security, function(req, res, next) {

		var s = `
				SELECT 
					id,isSuperUser,login,senha,email,matricula 
				FROM tb_sistema_operador`;

	    conn.connect(function(c){
	        c.select(s,function(returnQuery){
			console.log(returnQuery);
	        res.render('users',{'content':returnQuery,'title':'Usuário'});
	        });
	    });
	  
	});

	router.post('/login', function(req, res, next) {
		var l = req.body.login;
		var p = req.body.password;

		var s = `
				SELECT 
					id,isSuperUser,login,senha,email,matricula 
				FROM
					tb_sistema_operador
				WHERE
					tb_sistema_operador.login = '` + l + `'`;
		conn.connect(function(c){
	        c.select(s,function(returnQuery){

	        	if(returnQuery.length != 0){
					if(returnQuery[0].senha == p){
						req.session.authenticated = true;
						res.render('users',{'content':returnQuery[0],'title':'Usuário'});	
					}
				}
				res.render('index',{'error':"Login ou Senha inválidos",'title':'Comanda Online'});
	        });
	    });

	});

	router.get('/logout', security, function (req, res, next) {
				delete req.session.authenticated;
				res.redirect('/');
	});

  return router;
}


//module.exports = router;
