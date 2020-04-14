var express = require("express");
var app = express();

//Visiting "/" should print "Hi there, welcome to my assignment!"
app.get("/", function(req,res){
    res.send("Hi there, welcome to my assignment!");
})

//Visiting "/speak/pig" should print "The pig says 'Oink' "
//Visiting "/speak/cow" should print "The cow says 'Moo' "
//Visiting "/speak/dog" should print "The dog says 'Woof Woof!' "
app.get("/speak/:animal", function(req,res){
    if (req.params.animal.toLowerCase() === "pig") {
        res.send("The pig says 'Oink'");
    }else if(req.params.animal.toLowerCase() === "cow"){
        res.send("The cow says 'Moo'");
    }else if(req.params.animal.toLowerCase() === "dog"){
        res.send("The dog says 'Woof Woof'");
    }else{
        res.send("That guy ain't here dawg")
    }
})

//Visiting "/repeat/hello/3" should print "hello hello hello"
//Visiting "/repeat/hello/3" should print "hello hello hello hello hello"
//Visiting "/repeat/blah/2" should print "blah blah"
app.get("/repeat/:str/:howMany", function(req,res){
        var message = "";
        for(var i = 0; i < req.params.howMany; i++){
            message+=req.params.str + " ";
        }
        res.send(message);
        console.log(typeof req.params.howMany);
})

//If a user visits any other route, print:
//"Sorry, page not found... What are you doing with your life?"
app.get("*", function(req,res){
    res.send("Sorry, page not found... What are you doing with your life?");
})

//Tell Express to listen for requests (Start Server)
app.listen(3000, function () {
    console.log("Server has started");
});