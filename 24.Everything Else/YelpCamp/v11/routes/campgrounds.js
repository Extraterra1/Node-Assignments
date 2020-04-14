var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//ALL ROUTES START BY /campgrounds

router.get("/", function (req, res) {
    // Get all campgrounds from db
    Campground.find({}, function (err, campgroundsData) {
        if (err) {
            console.log(err);
        } else {
            res.render("campground/index", {
                campgrounds: campgroundsData
            });
        };
    });
});

router.post("/", middleware.isLoggedIn, function (req, res) {
    //Get data from form and add to campgrounds array
    var campName = req.body.campName;
    var img = req.body.img;
    var desc = req.body.desc;
    var authorName= req.user.username;
    var authorId= req.user._id;
    var price = req.body.price;
    var newCamp = {
        name: campName,
        img: img,
        description: desc,
        price: price,
        author: {
            id: authorId,
            username: authorName
        }
    };
    //Create new campground and save to DB
    Campground.create(newCamp, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        };
    });
});

router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campground/new");
});
//SHOW - shows more info about one campground
router.get("/:id", function (req, res) {
    //Find campground that matches the provided ID
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            //Render show template with that campground
            res.render("campground/show", {
                campground: foundCamp
            });
        };
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampOwnership, function(req,res){
    Campground.findById(req.params.id, function (err, foundCamp) {
        res.render("campground/edit", {
            campground: foundCamp
        });
    });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id/", function(req,res){
    var data = {
        name: req.body.campName,
        img: req.body.img,
        description: req.body.desc
    };
    //Find and update campground
    Campground.findByIdAndUpdate(req.params.id, data, function(err, updatedCamp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            //redirect
            res.redirect("/campgrounds/" + req.params.id);
        };
    });
    
});
//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampOwnership, function(req,res){
    Campground.deleteMany({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campground");
            res.redirect("/campgrounds");
        };
    });
});

//MIDDLEWARE 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

function checkCampOwnership(req,res,next){
    //Is user logged in
    if (req.isAuthenticated()) {
        //Find Camp
        Campground.findById(req.params.id, function (err, foundCamp) {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                //Does user own camp
                    //Checks if DB id is the same as the logged in user
                if (foundCamp.author.id.equals(req.user._id)) {
                    //If id is the same keep goind
                    return next();
                } else {
                    //if id not the same go back
                    console.log("not the owner");
                    res.redirect("back");
                };
            };
        });
    } else {
        //if not logged in, go back
        console.log("not logged in");
        res.redirect("back");
    };
}
module.exports = router;