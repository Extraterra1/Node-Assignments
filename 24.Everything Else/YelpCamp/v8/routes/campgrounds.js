var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');

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

router.post("/", isLoggedIn, function (req, res) {
    //Get data from form and add to campgrounds array
    var campName = req.body.campName;
    var img = req.body.img;
    var desc = req.body.desc;
    var authorName= req.user.username;
    var authorId= req.user._id;
    var newCamp = {
        name: campName,
        img: img,
        description: desc,
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

router.get("/new", isLoggedIn, function (req, res) {
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
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};
module.exports = router;