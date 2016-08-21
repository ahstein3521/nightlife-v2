var Yelp=require("../helpers/yelp")
var Venue=require("../models/venue");
var User=require("../models/user")
var RSVP=require("../models/RSVP");
var Query=require("../models/query");
var formatButtons=require("../helpers/btnHelper");

module.exports=function(app){
	app.get("/search",function(req,res,next){
		var city=req.query.city.toLowerCase();
		var cityTitle=city.charAt(0).toUpperCase()+city.substr(1);
		

		Query.findOne({location:city},function(err,data){
			if(err) return next(err);
			else if(!data){
				Yelp(req.query.city,function(data,err){
					if(err) return res.render("search",{title:"Error",location:city})

					formatButtons(data, req.user)
			 		return res.render("search",{venues:data,title:cityTitle})	
				})
			}	
			else{
				formatButtons(data,req.user)
				return res.render("search",{venues:data.results,title:cityTitle})				
			}
		})		
	})
	app.get("/remove",function(req,res){
		Query.find({},function(e,d){res.send(d)})
	})
	
	app.post("/rsvp/:id",function(req,res){
		var rsvp=new RSVP({user:req.user._id})
		rsvp.save(function(e,d){
			Venue.findOne({_id:req.params.id},function(err,data){
				data.attending.push(rsvp._id);
				data.save();
				res.status(200).send(rsvp._id)
			})
		})
	})
	app.delete("/rsvp/:id",function(req,res,next){
		RSVP.findByIdAndRemove({_id:req.params.id},function(err){
			if(err) return res.send(err)
			res.send("Deletion successful")
		})

	})
}	