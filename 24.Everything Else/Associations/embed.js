var mongoose= require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
//POST MODEL - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
})
var Post = mongoose.model("Post", postSchema);

//USER MODEL - email,name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
})
var User = mongoose.model("User", userSchema);

// // INSERTING NEW USER
// var userData = {
//     email: "extraterra2@gmail.com",
//     name: "JoeMama",
//     posts: []
// }
//     //Adding new post to the user's data to be inserted
//     userData.posts.push({
//         title: "I have no idea if this will work",
//         content: "I hope so."
//     });
// User.create(userData, function(err, dataSent){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(dataSent);
//     }
// })

//INSERTING NEW POST
// Post.create({
//     title: "This is the first post",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisi velit, mattis at urna eget, ultricies commodo erat. Duis a convallis metus, a venenatis mi. Sed vulputate, neque et volutpat tincidunt, nibh dolor varius nisi, non imperdiet orci risus eget felis. Cras interdum, justo a placerat tincidunt, dui sem efficitur nunc, nec varius nibh nisl et velit. Donec non orci nulla. Vestibulum in tellus sed risus blandit lobortis. Aenean sed mi sit amet nisl tincidunt fringilla. In condimentum iaculis lorem. Sed in imperdiet neque, quis ultricies augue."
// }, function(err, dataSent){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(dataSent);
//     }
// });

//Retrieve User
User.findOne({
    name: "JoeMama"
}, function(err, dataBack){
    if(err){
        console.log(err);
    }else{
        //Add a post to the posts array of the user that we found
        dataBack.posts.push({
            title: "This is the second post of this User",
            content: "Yeah why not."
        });
        //Saving the updated data
        dataBack.save(function(err, user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            };
        });
    };
});