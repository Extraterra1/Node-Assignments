var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

//===================================
//          COMMENTS
//===================================
//COMMENTS NEW
router.get("/new", isLoggedIn, function (req, res) {
    //FIND CAMPGROUND BY ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    })
});
//COMMENTS NEW POSTS
router.post("/", isLoggedIn, function (req, res) {
    //Lookup campground using id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //Create new comment
            Comment.create({
                text: req.body.text,
                author: req.body.author
            }, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //Connect comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //Redirect to camp showpage
                    res.redirect("/campgrounds/" + campground._id);
                }
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