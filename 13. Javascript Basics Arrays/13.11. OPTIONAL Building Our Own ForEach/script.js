function myForEach(arr,func){
    // Loop through array
    for(var i = 0; i < arr.length; i++){
        //call func for each item in array
        func(arr[i]);
    }
}
var colors=["red","blue","yellow"];
myForEach(colors, function(color){
    console.log(color);
})

//Adding myForEach as a method for arrays (Ex. colors.myForEach()   )
    //"this" refers to the array in question (Ex. if I call countries.myForEach() then )
    //this is the array "countries"
Array.prototype.myForEach = function(func){
    for(var i = 0; i < this.length; i++){
        func(this[i]);
    }
}

var friends=["hugo","rafael","nadal"];
friends.myForEach(function(name){
    console.log("I love " + name);
})