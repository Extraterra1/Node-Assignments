var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose= require('mongoose');
var Campground = require('./models/campground');
var seedDB = require('./seeds');
var Comment = require('./models/comment');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var methodOverride = require('method-override');

//ROUTES
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var authRoutes = require('./routes/auth');

//Seed Database
// seedDB();

mongoose.connect("mongodb://localhost/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "Rusty rocks",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MIDDLEWARE THAT RUNS IN EVERY SINGLE ROUTE
//Passes the currentUser variable
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});
//USE ROUTE FILES
app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, function(){
    console.log("Server running");
});