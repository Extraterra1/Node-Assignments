var person= {
    name: "Joe",
    lastName: "Mama",
    friends: ["Deborah","Mario","Tristan"]
}

// Adding a function that makes a simple sum as a method of the object person
person.add = function(x,y){
    return x+y;
}

//Making a function speak that says woof or meow depending on where its invoked
var dog= {
    name: "Rusty",
    age: 3,
    speak: function(){
        return "WOOF!";
    }
}
var cat= {
    name: "MyGuys",
    age: 17,
    speak: function(){
        return "Meow!";
    }
}
