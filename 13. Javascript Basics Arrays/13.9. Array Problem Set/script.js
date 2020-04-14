function printReverse(item) {
    for(var i= item.length-1; i>=0; i--){
        console.log(item[i]);
    }
}

function isUniform(item){
    var counter=1;
    for(var i=1; i<item.length; i++){
        if (item[i] === item[i-1]) {
            counter++;
        }
    }
    if (counter === item.length) {
        return true;
    }else{
        return false;
    }
}

function sumArray(item){
    var storage=0;
    item.forEach(function(info){
        storage= storage + info;
    })
    return storage;
}

function max(item){
    var top= item[0];
    item.forEach(function(info){
        if (info > top) {
            top = info;
        }
    })
    return top;
}

