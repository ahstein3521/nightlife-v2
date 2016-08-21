var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var autopopulate=require('mongoose-autopopulate');

var querySchema=new Schema({
	location:{type:String,unique:true},
	results:[{type:Schema.Types.ObjectId, ref:"Venue",autopopulate:true}]
})

querySchema.plugin(autopopulate);
module.exports=mongoose.model("query",querySchema)