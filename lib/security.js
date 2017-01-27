var security = function(req,res,next) { security.checkRequest(req,res,next)};

security.checkRequest = function(req,res,next){
  console.log(" --- Security layer: " + req.originalUrl);
 
	if (!req.session || !req.session.authenticated) {
		//res.render('unauthorised', { status: 403 });
		res.redirect('/');
		return;
	}
	next(); 
}


module.exports = security;
 