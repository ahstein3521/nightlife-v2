module.exports=function(app){
	app.use(function(req,res,next){
		if(req.originalUrl.substr(0,5)!="/auth"){
			req.session.lastRoute=req.originalUrl;
		}
		next();
	})
	
	app.get("/",function(req,res){
		res.render("home",{title:"Home",user:req.user});

	})
}
