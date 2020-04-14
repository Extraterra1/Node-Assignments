var scores=[90,98,89,100,100,86,94];
var scores2=[40,65,77,82,80,54,73,63,95,49];
function average(arr){
    var counter = 0;
    for(var i=0; i < arr.length; i++){
        counter+=arr[i];
    }
    var result= Math.round(counter/arr.length);
    return result;
}
console.log(average(scores));
console.log(average(scores2));