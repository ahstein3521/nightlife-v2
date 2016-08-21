var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var autopopulate=require('mongoose-autopopulate');

var venueSchema = new Schema({
   location:{type:String,lowercase:true},
	   name:String,
	address:String,
	  phone:String,
	    url:{type:String,unique:true,required:true},
	  image:String,
	snippet:String,
	attending:[{type:Schema.Types.ObjectId,ref:"RSVP",autopopulate:true}]
});

venueSchema.plugin(require('mongoose-create-unique'))
venueSchema.plugin(autopopulate);
module.exports= mongoose.model('Venue', venueSchema);