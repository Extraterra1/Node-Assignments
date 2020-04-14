var express= require("express");
var app= express();

// "/" => "Hi there"
app.get("/", function(req,res){
    res.send("hi there");
});
// "/bye" => "Goodbye!"
app.get("/bye", function(req,res){
    res.send("goodbye");
})
// "/dog" => "MEOW"
app.get("/dog", function (req, res) {
    //Every time someone makes a get request to /dog it will log in console
    console.log("Someone made a request to /dog");
    res.send("MEOW");
})
//Listens for every page that has /r/something
app.get("/r/:subredditName", function(req,res){
    res.send("Welcome to the " + req.params.subredditName + " Subreddit");
})
//Listens for every page that has /r/something/comments/something/something
app.get("/r/:subredditName/comments/:id/:title", function(req,res){
    res.send("Welcome to a Subreddit comments page");
})
// Listens for every page that is not defined
app.get("*", function (req, res) {
    res.send("You're a star");
})
//Tell Express to listen for requests (Start Server)
app.listen(3000, function(){
    console.log("Server has started");
});