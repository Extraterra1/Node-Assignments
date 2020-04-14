// Number of squares that will be generated
var numSquares=6;
//Array with RGB Colors
var colors= [];
// Sets the picked color and updates the game title
var pickedColor;

init();


//Reset Button
document.getElementById("reset").addEventListener("click", function () {
    reset();
})

//Changes colors for the first time when page loads and adds listeners to difficulty buttons
function init(){
    //Adds functionality to difficulty buttons
    setUpDifficultyButtons();
    //Adds functionality and colors to squares
    setUpSquares();
    reset();
}

//Function for changing difficulty and resetting
function reset(){
    //Generate all new colors
    colors = generateRandomColors(numSquares);
    //Pick new random color
    pickedColor = pickColor();
    //Change H1 span to new color
    document.getElementById("colorDisplay").textContent = pickedColor;
    //Reset h1 background color
    document.querySelector("h1").style.backgroundColor = "steelblue";
    //Change winning message
    document.getElementById("message").textContent = "";
    //Change reset button text
    document.getElementById("reset").textContent = "New Colors";
    //Changes colors of squares
    for (var i = 0; i < document.querySelectorAll(".square").length; i++) {
        if (colors[i]) {
            //If there are colors available it will change the background color
            document.querySelectorAll(".square")[i].style.display = "block";
            document.querySelectorAll(".square")[i].style.backgroundColor = colors[i];
        } else {
            //if there arent it will make the remaining squares invisible
            document.querySelectorAll(".square")[i].style.display = "none";
        }
    }
}
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

//Adds functionality to difficulty buttons
function setUpDifficultyButtons(){
    //                  DIFFICULTY BUTTONS

    //Adds event listeners to both difficulty buttons and executes reset()
    //If you clicked easy then reset() will change colors and output 3 squares
    //If you clicked hard then reset() will change colors and output 6 squares
    for (var i = 0; i < document.querySelectorAll(".difficulty").length; i++) {
        document.querySelectorAll(".difficulty")[i].addEventListener("click", function () {
            document.querySelectorAll(".difficulty")[0].classList.remove("selected");
            document.querySelectorAll(".difficulty")[1].classList.remove("selected");
            this.classList.add("selected");

            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        })
    }
}

//Adds functionality and colors to squares
function setUpSquares(){
    //For Loop that Goes through every square
    for (var i = 0; i < document.querySelectorAll(".square").length; i++) {
        //Add click listeners to every square
        document.querySelectorAll(".square")[i].addEventListener("click", function () {
            //Grab color of picked square
            //stores value of backgroundColor of clicked square
            var clickedColor = this.style.backgroundColor
            //Compare color to pickedColor
            if (clickedColor === pickedColor) {
                //Change colors of the other squares
                changeColors(clickedColor);
                //Display the message
                document.getElementById("message").textContent = "Correct!";
                //Change background of h1 to pickedColor
                document.querySelector("h1").style.backgroundColor = pickedColor;
                //Change reset button text
                document.getElementById("reset").textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                document.getElementById("message").textContent = "Try again";
            }
        })
    }
}