var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo_2", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
//The dot(.) references current directory. (Route ends up as Associations/models/post)
//Mongoose models are located in different files, stored in /models
var Post = require('./models/post');
var User = require('./models/user');


// //Create Post and add that post's ID to the posts array in the corresponding user
// Post.create({
//     title: "How to cook the best burger Pt. 4",
//     content: "Blahblahblah blah blah blah blahblah blahblah"
// }, function(err, postSent){
//     User.findOne({email: "bob@gmail.com"}, function(err,foundUser){
//         if(err){
//             console.log(err);
//         }else{
                //Passes in all the data but only the ID will be stored because that's the data type that we defined for posts in the schema
//             foundUser.posts.push(postSent);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log(data);
//                 }
//             });
//         }
//     })
// })

//FIND USER
//FIND ALL POSTS FOR THAT USER
    //Populate finds all IDs stored in the posts array, then searches the collection
    // "posts" for posts that match those IDs and then returns all data corresponding to the post
// User.findOne({name:"Bob Belcher"}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// })