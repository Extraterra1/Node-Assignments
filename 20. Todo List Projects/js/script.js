//Toggle Input
$("h1 i").on("click",function(){
    $("input").slideToggle(500);
})

//Add new item to list
$("#todoInput").keypress(function(event){
    if (event.which === 13) {
        $("ul").append("<li><span><i class='fas fa-trash'></i></span>" + $("#todoInput").val() + "</li>");
        $(this).val("");
    }
})

//Click on todo item to put line through   
    //Listens to every li inside a ul
$("ul").on("click","li", function(){
    $(this).toggleClass("completed");
})

//Click on X to delete
    //listens to every span inside a ul
$("ul").on("click","span", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    //Stops event bubbling. When you click the span it wont count as both a span click event
    //and a li click event
    event.stopPropagation();
})