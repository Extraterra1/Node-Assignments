var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose= require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String
});

var Campground=mongoose.model("Campground", campgroundSchema);

app.get("/", function(req,res){
    res.render("landing");
})
app.get("/campgrounds", function(req,res){
    // Get all campgrounds from db
    Campground.find({}, function(err,campgroundsData){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: campgroundsData});
        }
    });
})

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
    res.render("new.ejs");
})
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    //Find campground that matches the provided ID
    var id = req.params.id;
    Campground.findById(id, function(err,foundCamp){
        if(err){
            console.log(err);
        }else{
            //Render show template with that campground
            res.render("show", {campground: foundCamp});
        }
    });
    
})

app.listen(3000, function(){
    console.log("Server running");
})