var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var autopopulate=require('mongoose-autopopulate');

var rsvpSchema=new Schema({
	user:{type:Schema.Types.ObjectId,ref:'User',autopopulate:true},
	date:{type:Date,default:Date.now}
})

rsvpSchema.plugin(autopopulate);
module.exports= mongoose.model('RSVP', rsvpSchema);