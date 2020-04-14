var button = document.querySelector("button");

button.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("purple");
})



// Longer way but thats just dumb.
// var isPurple = false;
// button.addEventListener("click", function () {
//     if (isPurple) {
//         document.body.style.background = "white";
//         isPurple = false;
//     }else{
//         document.body.style.background = "purple";
//         isPurple = true;
//     }
        // isPurple=!isPurple;
        //No need to set the value up top if you add this.
// })

