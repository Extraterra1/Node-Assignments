var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

//Data to be added
var data=[
    {
        name: "Cloud's Rest",
        img: "https://s0.geograph.org.uk/photos/04/42/044209_6d4a56bd.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum neque in tellus aliquet tincidunt. Suspendisse bibendum, leo id accumsan ultricies, turpis nisi congue sem, a sollicitudin est lacus at justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at elit ac massa sodales mollis vitae sodales ipsum. Praesent malesuada dui dui, nec malesuada turpis porttitor non. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam accumsan vitae ante ut blandit. Fusce feugiat, sem non efficitur gravida, neque massa vestibulum diam, et aliquet nibh erat a velit. Mauris iaculis justo vitae leo venenatis, et posuere nulla commodo. Cras vel urna dignissim, vehicula velit quis, fringilla massa. Phasellus lobortis dignissim diam, et blandit neque accumsan in. Sed porta nibh sit amet orci tristique, vel lobortis tellus suscipit. Duis imperdiet massa et venenatis vehicula. Aliquam placerat odio dapibus metus scelerisque, non vehicula lacus maximus."
    },
    {
        name: "Desert Mesa",
        img: "https://media-cdn.tripadvisor.com/media/photo-s/0a/0b/95/39/photo0jpg.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum neque in tellus aliquet tincidunt. Suspendisse bibendum, leo id accumsan ultricies, turpis nisi congue sem, a sollicitudin est lacus at justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at elit ac massa sodales mollis vitae sodales ipsum. Praesent malesuada dui dui, nec malesuada turpis porttitor non. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam accumsan vitae ante ut blandit. Fusce feugiat, sem non efficitur gravida, neque massa vestibulum diam, et aliquet nibh erat a velit. Mauris iaculis justo vitae leo venenatis, et posuere nulla commodo. Cras vel urna dignissim, vehicula velit quis, fringilla massa. Phasellus lobortis dignissim diam, et blandit neque accumsan in. Sed porta nibh sit amet orci tristique, vel lobortis tellus suscipit. Duis imperdiet massa et venenatis vehicula. Aliquam placerat odio dapibus metus scelerisque, non vehicula lacus maximus."
    },
    {
        name: "Canyon Floor",
        img: "https://www.insidermedia.com/uploads/news/resized/Serenity-Camping-2335-1571146572.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum neque in tellus aliquet tincidunt. Suspendisse bibendum, leo id accumsan ultricies, turpis nisi congue sem, a sollicitudin est lacus at justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at elit ac massa sodales mollis vitae sodales ipsum. Praesent malesuada dui dui, nec malesuada turpis porttitor non. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam accumsan vitae ante ut blandit. Fusce feugiat, sem non efficitur gravida, neque massa vestibulum diam, et aliquet nibh erat a velit. Mauris iaculis justo vitae leo venenatis, et posuere nulla commodo. Cras vel urna dignissim, vehicula velit quis, fringilla massa. Phasellus lobortis dignissim diam, et blandit neque accumsan in. Sed porta nibh sit amet orci tristique, vel lobortis tellus suscipit. Duis imperdiet massa et venenatis vehicula. Aliquam placerat odio dapibus metus scelerisque, non vehicula lacus maximus."
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