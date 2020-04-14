// Number of squares that will be generated
var numSquares=6;
//Array with RGB Colors
var colors= generateRandomColors(numSquares);
// Sets the picked color and updates the game title
var pickedColor= pickColor();
//Changes the h1 to display the RGB value of the picked color
document.getElementById("colorDisplay").textContent = pickedColor

//Reset Button
document.getElementById("reset").addEventListener("click",function(){
    //Generate all new colors
    colors = generateRandomColors(numSquares); 
    //Pick new random color
    pickedColor = pickColor();
    //Change H1 span to new color
    document.getElementById("colorDisplay").textContent = pickedColor;
    //Reset h1 background color
    document.querySelector("h1").style.backgroundColor = "steelblue";
    //Change colors of all squares
    for (var i = 0; i < document.querySelectorAll(".square").length; i++){
        document.querySelectorAll(".square")[i].style.backgroundColor = colors[i];
    }
    //Change winning message
    document.getElementById("message").textContent = "";
    //Change button text
    this.textContent = "New Colors";
})

//For Loop that Goes through every square
for(var i = 0; i < document.querySelectorAll(".square").length; i++){
    // Adds a different color to every square
    document.querySelectorAll(".square")[i].style.backgroundColor = colors[i];
    //Add click listeners to every square
    document.querySelectorAll(".square")[i].addEventListener("click", function(){
        //Grab color of picked square
            //stores value of backgroundColor of clicked square
        var clickedColor=this.style.backgroundColor
        //Compare color to pickedColor
        if (clickedColor===pickedColor) {
            //Change colors of the other squares
            changeColors(clickedColor);
            //Display the message
            document.getElementById("message").textContent="Correct!";
            //Change background of h1 to pickedColor
            document.querySelector("h1").style.backgroundColor = pickedColor;
            //Change reset button text
            document.getElementById("reset").textContent = "Play Again?";
        }else{
            this.style.backgroundColor = "#232323";
            document.getElementById("message").textContent= "Try again";
        }
    })
}

//EASY BUTTON
document.getElementById("easyBtn").addEventListener("click",function(){
    //Makes the buttons change background color by adding class .selected
    this.classList.add("selected");
    document.getElementById("hardBtn").classList.remove("selected");
    //Generate new colors
    numSquares = 3;
    colors = generateRandomColors(numSquares); //3 colors for easy mode
    pickedColor = pickColor();
    //Change color of span
    document.getElementById("colorDisplay").textContent = pickedColor;
    //Change colors and display of squares
    for (var i = 0; i < document.querySelectorAll(".square").length; i++) {
        if(colors[i]){
            document.querySelectorAll(".square")[i].style.backgroundColor = colors[i];
        }else{
            document.querySelectorAll(".square")[i].style.display="none";
        }
    }

})

//HARD BUTTON
document.getElementById("hardBtn").addEventListener("click",function(){
    //Makes the buttons change background color by adding class .selected
    this.classList.add("selected");
    document.getElementById("easyBtn").classList.remove("selected");
    //Generate new colors
    numSquares=6;
    colors = generateRandomColors(numSquares); //3 colors for easy mode
    pickedColor = pickColor();
    //Change color of span
    document.getElementById("colorDisplay").textContent = pickedColor;
    //Change colors and display of squares
    for (var i = 0; i < document.querySelectorAll(".square").length; i++) {
        document.querySelectorAll(".square")[i].style.backgroundColor = colors[i];
        document.querySelectorAll(".square")[i].style.display = "block";
    }

})

//Loops through every square and changes background color to whatever value you send
function changeColors(color){
    for (var i = 0; i < document.querySelectorAll(".square").length; i++) {
        document.querySelectorAll(".square")[i].style.backgroundColor = color;
    }
}

//Picks a random color
function pickColor(){
    //Gets a random number from 0 to 0.9999999999999 (doesn't reach 1)
    //By multiplying by colors length we get it to generate a number from 0 to however long the array is (never getting the last number in the array)
    //We dont have to add 1 to the generated number so the last number of the array can appear because length is already 1 more than the max index
    //A Random number between 1 and however long the array is will be generated
    //Math.floor makes it an integer. 0.99 is 0. 1.01 is 1
    var random=Math.floor(Math.random() * colors.length);
    return colors[random];
}

//Generates random colors array
function generateRandomColors(num){
    //Make an array
    var arr=[]
    //Repeat num times
    for(var i=0; i<num; i++){
        //Get Random color and push into array
        arr.push(randomColor());
    }
    //return array
    return arr;
}

//Generate random color
function randomColor(){
    //Pick a red from 0 to 255
        //Needs to be 256 because it wouldnt be able to generate 255 otherwise (floor rounds down)
    var r= Math.floor(Math.random() * 256)
    //Pick a green from 0 to 255
    var g= Math.floor(Math.random() * 256)
    //Pick a blue from 0 to 255
    var b= Math.floor(Math.random() * 256)

    var returnedColor= "rgb(" + r + ", " + g + ", " + b + ")";
    return returnedColor;
}