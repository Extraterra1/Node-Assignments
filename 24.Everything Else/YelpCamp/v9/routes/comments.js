var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//ALL ROUTES START BY /campgrounds/:id/comments

//===================================
//          COMMENTS
//===================================
//COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function (req, res) {
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
//COMMENTS NEW POST
router.post("/", middleware.isLoggedIn, function (req, res) {
    //Lookup campground using id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //Create new comment
            Comment.create({
                text: req.body.text,
                author: {
                    id: req.user._id,
                    username: req.user.username
                }
            }, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //Connect comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    //Redirect to camp showpage
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        };
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    var camp = req.params.id;
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err)
        }else{
            res.render("comments/edit", {comment: foundComment, campground_id: camp});
        }
    });
});

//UPDATE ROUTE (PUT)
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    var data = {
        text: req.body.text
    }
    Comment.findByIdAndUpdate(req.params.comment_id, data, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        };
    });
});

//DELETE COMMENT ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.deleteMany({_id: req.params.comment_id}, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            console.log("deleted comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

function checkCommentOwnership(req, res, next) {
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
}

module.exports = router;