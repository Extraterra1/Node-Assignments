var isDone=false;
var toDoList = [];

while (!isDone) {
    // var toDoList = [];
        // Cant put that in here because it would empty the array every time it asks
    
    
    var operation= prompt("What do you want to do?");
    if (operation==="new") {
        toDoList.push(prompt("Enter the new task"));
    }else if (operation==="list") {
        console.log(toDoList);
    }else if (operation==="quit") {
        isDone = true;
    }
    
// This would actually work but im stupid 
    // switch (operation) {
    //     case "new":
    //         toDoList.push(prompt("Enter the new task"));
    //         break;
        
    //     case "list":
    //         console.log(toDoList);
    //         break;

    //     case "quit":
    //         isDone=true;
    //         break;
    //     default:
    //         break;
    // }
}