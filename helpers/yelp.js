var yelp = require("node-yelp");
var Venue=require("../models/venue")
var Query=require("../models/query")

var client = yelp.createClient({
  oauth: {
    "consumer_key": process.env.key,
    "consumer_secret": process.env.secret,
    "token": process.env.token,
    "token_secret": process.env.token_secret
  }
})  

module.exports=function(city,callback){

	client.search({category_filter:"nightlife",location: city})
		.then(function (data){
 		
		var results=data.businesses.map(function(v,i){
			return {name:v.name,
				 address:v.location.display_address.join(', '),
				   phone:v.display_phone,
				     url:v.url,
				   image:v.image_url,
				  snippet:v.snippet_text,
				}
			})
		Venue.createUnique(results)
			.then(function(data){
				var query=new Query({location:city});
					query.results=data.map(function(v){return v._id})
					query.save(function(err,d){
				return callback(data);	
			})	
		})

				
	}).catch(function(err){
		return callback(null,err)
	})

}