//Selecting all lis
    for (var i = 0; i < document.querySelectorAll("li").length; i++) {
        //Green on mouse over
        document.querySelectorAll("li")[i].addEventListener("mouseover", function () {
            this.classList.toggle("selected");
        })
        //Black on mouse out
        document.querySelectorAll("li")[i].addEventListener("mouseout", function () {
            this.classList.toggle("selected");
        })
        //Adding class done when clicked
        document.querySelectorAll("li")[i].addEventListener("click", function () {
            this.classList.toggle("done");
        })
    }

