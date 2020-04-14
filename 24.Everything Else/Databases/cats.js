var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//Adding a new cat to the DB

// var george=new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(error, cat){
//     if(error){
//         console.log("Something wrong");
//     }else{
//         console.log("WE GOOOD");
//         console.log(cat);
//         console.log("================");
//         console.log(george);
//     }
// });

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log("==============");
        console.log(data);
    }
})

//Retrieve all cats from the DB and console.log each one

Cat.find({}, function(err,data){
    if(err){
        console.log("OH SH");
        console.log(err);
    }else{
        console.log("All the cats");
        console.log(data);
    }
})