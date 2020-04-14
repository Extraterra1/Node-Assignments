var player1score=0;
var player2score=0;
var gameOver=false;
var winningScore = 5;

//Player 1 Button
var player1= document.getElementById("p1");
player1.addEventListener("click", function(){
    if(!gameOver){
        player1score++;
        if(player1score===winningScore){
            gameOver=true;
            document.getElementById("p1score").classList.add("winner");
        }
        document.getElementById("p1score").textContent = player1score;
    }
})

//Player 2 Button
var player2= document.getElementById("p2");
player2.addEventListener("click", function () {
    if (!gameOver) {
        player2score++;
        if (player2score === winningScore) {
            gameOver = true;
            document.getElementById("p2score").classList.add("winner");
        }
        document.getElementById("p2score").textContent = player2score;
    }
})

//Reset Button
var reset = document.getElementById("reset");
reset.addEventListener("click", resetScore)

//Score input
var input= document.querySelector("input");
input.addEventListener("change", function(){
    //The value method returns a string, not an integer. parseInt converts the string to an integer
    //Can also use Number(input.value) instead of parseInt
    document.querySelector("p span").textContent = parseInt(input.value);
    winningScore = parseInt(input.value);
    resetScore();
})

function resetScore(){
     //Set gameOver to false
     gameOver = false;
     //Player 1
     player1score = 0;
     document.getElementById("p1score").classList.remove("winner");
     document.getElementById("p1score").textContent = player1score;
     //Player 2
     player2score = 0;
     document.getElementById("p2score").classList.remove("winner");
     document.getElementById("p2score").textContent = player2score;
}