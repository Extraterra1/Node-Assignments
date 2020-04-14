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

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

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
})

app.get("/", function(req,res){
    res.render("landing");
})
app.get("/campgrounds", function(req,res){
    // Get all campgrounds from db
    Campground.find({}, function(err,campgroundsData){
        if(err){
            console.log(err);
        }else{
            res.render("campground/index", {campgrounds: campgroundsData});
        };
    });
});

app.post("/campgrounds", function(req,res){
    //Get data from form and add to campgrounds array
    var campName=req.body.campName;
    var img=req.body.img;
    var desc=req.body.desc;
    var newCamp= {name: campName, img: img, description: desc};
    //Create new campground and save to DB
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
})

app.get("/campgrounds/new", function(req,res){
    res.render("campground/new");
})
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    //Find campground that matches the provided ID
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,foundCamp){
        if(err){
            console.log(err);
        }else{
            //Render show template with that campground
            res.render("campground/show", {campground: foundCamp});
        }
    });
    
})
//===================================
//          COMMENTS
//===================================
//COMMENTS NEW
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
    //FIND CAMPGROUND BY ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campground: campground});
        }
    }) 
});
//COMMENTS NEW POSTS
app.post("/campgrounds/:id/comments", isLoggedIn,function(req,res){
    //Lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //Create new comment
            Comment.create({
                text: req.body.text,
                author: req.body.author
            }, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    //Connect comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //Redirect to camp showpage
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        };
    });
});

//===================================================
//AUTH ROUTES
//===================================================

//REGISTER FORM
app.get("/register", function(req,res){
    res.render("register");
});

//HANDLE SIGN UP LOGIC
app.post("/register", function(req,res){
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req,res, function(){
                res.redirect("/campgrounds");
                console.log(user);
            });
        };
    });
});

//LOGIN FORM
app.get("/login", function(req,res){
    res.render("login");
})
//HANDLE LOGIN LOGIC
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){});

//LOGOUT ROUTE
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.listen(3000, function(){
    console.log("Server running");
});