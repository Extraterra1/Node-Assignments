var mongoose = require('mongoose');
var passportLocalMongoose= require('passport-local-mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
//Adds a bunch of methods of the passport local mongoose to the userschema
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);
module.exports = User;