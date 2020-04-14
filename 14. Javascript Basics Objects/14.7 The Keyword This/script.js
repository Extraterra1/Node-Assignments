var comments = {
    data: ["you suck", "good shit", "great video","keep going"],
}

//Function that prints every single item
function printAll(arr){
    arr.forEach(function(el){
        console.log(el);
    })
}
// printAll(comments.data);

// Now making this function a method for comments
comments.print = function(){
    this.data.forEach(function(element){
        console.log(element);
    })

}