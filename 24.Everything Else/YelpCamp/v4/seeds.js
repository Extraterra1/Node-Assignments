var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

//Data to be added
var data=[
    {
        name: "Cloud's Rest",
        img: "https://s0.geograph.org.uk/photos/04/42/044209_6d4a56bd.jpg",
        description: "This is a campsite with a cloud"
    },
    {
        name: "Desert Mesa",
        img: "https://media-cdn.tripadvisor.com/media/photo-s/0a/0b/95/39/photo0jpg.jpg",
        description: "This is a campsite in a desert"
    },
    {
        name: "Canyon Floor",
        img: "https://www.insidermedia.com/uploads/news/resized/Serenity-Camping-2335-1571146572.jpg",
        description: "This is a campsite in a Canyon"
    }
]

function seedDB(){
    //Remove all campgrounds nad Comments
    Comment.deleteMany({});
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds")
        };
    //Add a few campgrounds after DB is cleared
    data.forEach(function (seed) {
        Campground.create(seed, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log("Added Campground");
                //Create a comment
                Comment.create(
                    {
                        text: "This place is great but i wish there was internet", 
                        author: "Homer"
                    }, function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            data.comments.push(comment)
                            data.save();
                            console.log("Created new comment");
                        } 
                })
            };
        });
    });
    });
    
    //Add a few comments
};

module.exports = seedDB;