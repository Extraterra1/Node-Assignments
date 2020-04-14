var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [{
        name: "Salmon Creek",
        img: "https://www.campingandcaravanningclub.co.uk/GetAsset.aspx?id=fAAyADYAMQAxADEAfAB8AEYAYQBsAHMAZQB8AHwAMAB8AA2"
    },
    {
        name: "Granite Hill",
        img: "https://travelground.imgix.net/AAEAAQAAAAAAAAAAAAAAY3AdFEZ2v6ODb0dq97yZnmskZYAWpWXdZlbPC935uzoJqdDAG8?fit=crop&w=625&h=440&bg=000000&auto=enhance,compress&q=80"
    },
    {
        name: "Mountain Goat's Rest",
        img: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s615/Campsites.jpg"
    }
];


    app.get("/", function(req,res){
    res.render("landing");
})
app.get("/campgrounds", function(req,res){
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req,res){
    //Get data from form and add to campgrounds array
    var campName=req.body.campName;
    var img=req.body.img;
    var newCamp= {name: campName, img: img};
    campgrounds.push(newCamp);
    
    //Redirect back to campgrounds page
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
})

app.listen(3000, function(){
    console.log("Server running");
})