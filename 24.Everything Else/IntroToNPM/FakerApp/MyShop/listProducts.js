var faker= require("faker");
for(var i=1; i <=10; i++){
    var message = i+". "+ faker.commerce.productName() + " - Price: " + faker.commerce.price();
    console.log(message);
}