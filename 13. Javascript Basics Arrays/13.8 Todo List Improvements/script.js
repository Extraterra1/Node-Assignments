var toDoList = [];

// Gotta add this timeout thingy to give Chrome the time to load the HTML, if it's not 
// loaded when the js executes then it wont display the console.logs until after the 
// pop up is closed. Check the note in this chapter is you want to know more
// I lost like half an hour because of this shit I wanna KMS
window.setTimeout(function () {
var operation = prompt("What do you want to do?");


while (operation !== "quit") {
    // var toDoList = [];
        // Cant put that in here because it would empty the array every time it asks
    
    
    // var operation= prompt("What do you want to do?");
    // if (operation==="new") {
    //     toDoList.push(prompt("Enter the new task"));
    //     console.log(toDoList[toDoList.length-1]);
    // }else if (operation==="list") {
    //     console.log(toDoList);
    // }else if (operation==="quit") {
    //     isDone = true;
    // }
    
// This would actually work but im stupid 
    switch (operation) {
        case "new":
            toDoList.push(prompt("Enter the new task"));
            console.log(toDoList[toDoList.length-1] + " added to list");
            break;
        
        case "list":
            console.log("******"); 
            
            toDoList.forEach(function(item,index){
                console.log(index + ": " + item);
            })

            console.log("******"); 
            break;

        case "delete":
            toDoList.splice(prompt("which index?"), 1);
            console.log("Todo removed");
            break;
        
        default:
            break;
    }
    operation = prompt("What do you want to do?");
}
console.log("Goodbye");
}, 500);