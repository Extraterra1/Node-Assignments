var whichOne=Number(prompt("Which exercise do you want"));

switch (whichOne) {
    case 1:
        console.log("Print all numbers between -10 and 19");
        count=-10;
        while (count <=19) {
            console.log(count);
            count++;
        }
        break;
    case 2:
        console.log("Print all even numbers between 10 and 40");
        count=10;
        while (count <=40) {
            console.log(count);
            count+=2;
        }
        break;
    case 3:
        console.log("Print all odd numbers between 300 and 333");
        count=301;
        while (count<=333) {
            console.log(count);
            count+=2;
        }
        break;
    case 4:
        console.log("Print all numbers divisible by 5 AND 3 between 5 and 50");
        count=5;
        while (count<=50) {
            if ((count % 5 === 0) && (count % 3 === 0)) {
                console.log(count);
            }
            count++;
        }
        break;
    default:
        break;
}