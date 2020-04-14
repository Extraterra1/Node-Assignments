var express = require('express');
var mongoose = require("mongoose");
var passport= require('passport');
var bodyParser= require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var app = express();
var User= require('./models/user');

mongoose.connect("mongodb://localhost/auth_demo_app", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.use(bodyParser.urlencoded({extended: true}));
//Secret is the key that decrypts the session data, can be anything
app.use(require("express-session")({
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false
}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

//Reads the session and encodes/unencodes
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================================
//ROUTES
app.get("/", function(req,res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req,res){
    res.render("secret");
});
//AUTH ROUTES
//Show signup form
app.get("/register", function(req,res){
    res.render("register");
});
//POST route for register form
app.post("/register", function(req,res){
    //Takes username but password is sent separately to be hashed
    User.register(new User({username: req.body.username}),req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        //Logs user in an redirects to secret page
        passport.authenticate('local')(req, res, function () {
            res.redirect('/secret');
        });
    });
});
//=============================
//LOGIN ROUTES
//Form GET route
app.get("/login", function(req,res){
    res.render("login");
});
//Handle login POST route
//Passport.authenticate is middleware, code that executes after the route is initialized but before it is completed. Function isLoggedIn at the bottom is middleware
//Passport.authenticate() automaticaly takes the inputs with the names username and password and passes that through
//Password field HAS TO BE NAMED PASSWORD IN THE HTML FORM
//Username field HAS TO BE NAMED USERNAME IN THE HTML FORM
app.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req,res){});
//LOGOUT ROUTE
app.get("/logout", function(req,res){
    //Passport method to log out, destroys all the session data
    req.logout();
    res.redirect("/");
})

//Middleware that checks if the user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        //Next means keep going with the route
        //If user is authenticated(Passport method) then the route will keep going
        //If user isnt authenticated then redirect to login
        return next();
    }else{
        res.redirect("/login");
    };
};

app.listen(3000, function(){
    console.log("server listening");
});