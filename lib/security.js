var security = function(req,res,next) { security.checkRequest(req,res,next)};

security.checkRequest = function(req,res,next){
  console.log(" --- Security layer: " + req.originalUrl);
 
	if (!req.session || !req.session.authenticated) {
		//res.render('unauthorised', { status: 403 });
		res.render('login', { title: 'Chocolateria Brasileira', error:false,'menu':false});
		return;
	}
	next(); 
}


module.exports = security;
 