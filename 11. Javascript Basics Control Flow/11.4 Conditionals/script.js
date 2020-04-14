var age= prompt("How old are you?");
var message;
if (age < 18) {
    message= "Go away, you're too young";
}else if (age < 21) {
    message= "You can come, but no drinks buddy";
}else if (age < 0) {
    message="That's impossible fam";
}else{
    message= "You're good Fam";
}

if (age % 2 == 0) {
    message=message+", your age is even btw xd"
}else{
    message= message+", your age is odd; couldn't be me";
}

ageSquare= Math.sqrt(age);
if (Number.isInteger(ageSquare)) {
    message= message+". Also, your age is a perfect square how crazy is that dude";
}else{
    message = message + ". Also, your age isn't a perfect square how lame is that dude";
}
console.log(message);