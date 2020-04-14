var express = require("express");
var app = express();
var request = require('request');

app.set("view engine", "ejs");

app.get("/results", function(req,res){
    //Extracts GET variable
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s="+ query + "&apikey=thewdb";
    request(url, function(error,response,body){
        if(!error && response.statusCode == 200){
            var parsedData= JSON.parse(body);
            res.render("results", {parsedData: parsedData});
        }
    });
})
app.get("/", function(req,res){
    res.render("search");
})

app.listen(3000, function(){
    console.log("server listening");
})