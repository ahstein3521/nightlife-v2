var express=require("express");
var app = module.exports.app = exports.app = express();
var exphbs=require('express-handlebars');
var passport=require('passport');
var session=require('express-session')
var mongoose = require('mongoose');
var cookieParser=require('cookie-parser')
var bodyParser=require('body-parser');


require('dotenv').config();

//mongooses Promise library is deprecated
mongoose.Promise=require("bluebird")
mongoose.connect(process.env.mongoURI);


app.use(cookieParser());
app.use(session({secret:process.env.cookie_secret,saveUninitialized:true,resave:false}));
app.use(bodyParser.urlencoded({ extended: true}))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use("/public", express.static(__dirname+'/public'));

require('./config/passport')(app);

require("./routes/index")(app)
require("./routes/auth")(app)
require("./routes/venues")(app)
require("./routes/error")(app)

app.listen(process.env.PORT||8080,function(){
	console.log("Serving ....");
})