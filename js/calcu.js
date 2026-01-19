const plus = document.getElementById("plusBtn");
const minus = document.getElementById("minusBtn");
const divide = document.getElementById("slashBtn");
const multiply = document.getElementById("astBtn");
const display = document.getElementById("display");


const one = document.getElementById("oneBtn");
const two = document.getElementById("twoBtn");

one.addEventListener("click", function(){
    if(display.innerText == 0){
        display.innerText = "";
    }

    display.innerText += 1;
});

//to convert the display to number -- Number(display.innerText)
// everytime an operator is clicked, the numerical version of the display.innertext will be received by a variable so that in the final moment when equals is clicked, it will be used to do the operations
