var answer;
var isThere= false;

while (!isThere) {
    answer=prompt("Are we there yet?");
    // if (answer==="yes" || answer==="yeah") {
    //     alert("Yay!, we finally made it");
    //     isThere=true;
    // }
    // Check if string contains the word yes, if it does then end the loop
    if (answer.indexOf("yes")!=-1) {
        alert("Yay, we finally made it!!!");
        isThere=true;
    }
}