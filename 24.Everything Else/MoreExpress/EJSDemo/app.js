var express = require("express");
var app = express();
//Serves all the contents inside the public folder
//This enables us to link the css
app.use(express.static("public"));
//Sets .ejs as the defaul file. No need to type .ejs when calling render
app.set("view engine", "ejs");
app.get("/", function(req,res){
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req,res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
})
app.get("/posts", function(req,res){
    var posts= [
        {
            title: "Post 1",
            author:"Susy"
        },
        {
            title: "My pet Bunny",
            author:"Charlie"
        },
        {
            title: "Can you believe this pomsky",
            author:"Joe"
        }
    ]
    res.render("posts", {posts: posts});
})

app.listen(3000, function(){
    console.log("Server listening");
})