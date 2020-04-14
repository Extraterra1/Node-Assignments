var movieList=[
    {
        title: "Hereditary",
        rating: 5,
        hasWatched: true
    },
    {
        title: "Knives Out",
        rating: 4.75,
        hasWatched: false
    },
    {
        title: "Ford v Ferrari",
        rating: 4.5,
        hasWatched: true
    }
]

movieList.forEach(function(obj){
    var message = "You have";
    if (obj.hasWatched === true) {
        message += " watched";
    }else{
            message += " not seen";
    }
    message += " \"" + obj.title + "\" - ";
    message += obj.rating +" stars";
    console.log(message);
})