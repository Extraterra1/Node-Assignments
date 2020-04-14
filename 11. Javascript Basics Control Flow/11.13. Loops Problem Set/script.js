var whichOne = Number(prompt("Which exercise do you want"));

switch (whichOne) {
    case 1:
        console.log("Pint all numbers between -10 and 19");
        for(var i=-10; i<=19; i++){
            console.log(i);
        }
        break;
    case 2:
        console.log("Print all even numbers between 10 and 40");
        for(var i=10; i<=40; i+=2){
            console.log(i);
        }
        break;
    case 3:
        console.log("Print all odd numbers between 300 and 333");
        for(var i= 301; i<=333; i+=2){
            console.log(i);
        }
        break;
    case 4:
        console.log("Print all numbers divisible by 5 AND 3 between 5 and 50");
        for(var i=5; i<=50; i++){
            if ((i % 5 ===0)&&(i % 3 ===0)) {
                console.log(i);
            }
        }
        break;
    default:
        break;
}