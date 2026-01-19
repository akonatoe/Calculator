const plus = document.getElementById("plusBtn");
const minus = document.getElementById("minusBtn");
const divide = document.getElementById("slashBtn");
const multiply = document.getElementById("astBtn");
const display = document.getElementById("display");


const one = document.getElementById("oneBtn");
const two = document.getElementById("twoBtn");

one.addEventListener("click", function(){
    display.innerText += 1;

});