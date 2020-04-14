
// Prompt will always store numbers as strings, Number() makes it a number
// var numberToGuess=Math.random();
var numberToGuess=6;
var isGuessed=false;

var guessedNumber = Number(prompt("Guess the number bro"));
    if (guessedNumber > numberToGuess) {
        alert("Too High dude");
    } else if (guessedNumber < numberToGuess) {
        alert("Aim higher my guy");
    } else if (guessedNumber === numberToGuess) {
        alert("You got it dude");
        isGuessed=true;
    }

// How to keep it asking
// while (!isGuessed) {
//     var guessedNumber = Number(prompt("Guess the number bro"));
//     if (guessedNumber > numberToGuess) {
//         alert("Too High dude");
//     } else if (guessedNumber < numberToGuess) {
//         alert("Aim higher my guy");
//     } else if (guessedNumber === numberToGuess) {
//         alert("You got it dude");
//         isGuessed=true;
//     }
// }