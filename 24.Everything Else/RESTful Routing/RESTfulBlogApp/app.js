var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride= require('method-override');
var expressSanitizer = require('express-sanitizer');

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//MONGOOSE CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    img: String,
    body: String,
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
//INDEX ROUTE
app.get("/", function(req,res){
    res.redirect("/blogs");
})
//BLOGS ROUTE
app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    })
})
//NEW ROUTE
app.get("/blogs/new", function(req,res){
    res.render("new");
})
//CREATE ROUTE
app.post("/blogs", function(req,res){
    // Create Blog
    req.body.body = req.sanitize(req.body.body);
    var data = {
        title: req.body.title,
        img: req.body.img,
        body: req.body.body
    };
    Blog.create(data, function(err,newBlog){
        if(err){
            console.log(err);
        }else{
             //Redirect to index
             res.redirect("/blogs");
        }
    })
})
//SHOW ROUTE
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/");
        }else{
            res.render("show",{blog: foundBlog});
        }
    })
})

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.redirect("/");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    })
})
//UPDATE ROUTE
//The PUT Method works thanks to the method-override package
//Not available with vanilla HTML
app.put("/blogs/:id", function(req,res){
    req.body.body = req.sanitize(req.body.body);
    var data = {
        title: req.body.title,
        img: req.body.img,
        body: req.body.body
    };
    Blog.findByIdAndUpdate(req.params.id, data, function(err, updatedBlog){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});
//DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
    //Destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err, deletedItem){
        if(err){
            console.log("There's an error");
        }else{
            res.redirect("/")
        }
    })
    //redirect
});
app.listen(3000, function(){
    console.log("Server listening");
})