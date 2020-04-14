var mongoose = require('mongoose');
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;