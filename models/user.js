var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var userSchema = new Schema({
    photo:String,
    id:String,
    github_refreshToken:String,
    github_accessToken:String,
    username:String
})

module.exports= mongoose.model('User', userSchema);