var Campground = require("../models/campground");
var Comment = require("../models/comment");

//ALL MIDDLEWARE GOES HERE
var middlewareObj = {};

middlewareObj.checkCampOwnership = function (req, res, next) {
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
};


middlewareObj.checkCommentOwnership = function(req, res, next) {
    //Is user logged in
    if (req.isAuthenticated()) {
        //Find comment
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                //Does user own comment
                //Checks if DB id is the same as the logged in user
                if (foundComment.author.id.equals(req.user._id)) {
                    //If id is the same keep going
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
};


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};


module.exports = middlewareObj