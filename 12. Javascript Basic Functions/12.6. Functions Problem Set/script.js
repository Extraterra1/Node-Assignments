function isEven(num){
    if (num % 2 === 0) {
        return true;
    }else{
        return false;
    }
}

function factorial(num) {
    if (num===0) {
        return 1;
    }
    for (var count = num - 1; count > 0; count--) {
        num= num*count;
    }
    return num;
}

function kebabToSnake(str){
    return str.replace(/-/g, "_");
}