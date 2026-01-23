const plus = document.getElementById("plusBtn");
const minus = document.getElementById("minusBtn");
const divide = document.getElementById("slashBtn");
const multiply = document.getElementById("astBtn");
const display = document.getElementById("display");

const calcuBtn = document.querySelectorAll(".calcu-btn");
const text = document.querySelector("#testing")

calcuBtn.forEach(btn => {
    btn.addEventListener("click", function() {
    const btnValue = btn.innerText;


    const operator_count = 0;

    if(btnValue == '+' || btnValue == '-' || btnValue == '*' || btnValue == '/' || btnValue == "."){

    }
    

    if (display.innerText == 0){
        
        display.innerText = "";
        console.log(btnValue);
    }


    display.innerText += btnValue;
        
    })
});




one.addEventListener("click", function(){
    

    display.innerText += 1;
});

plus.addEventListener("click", function(){
    const value = [];

});

//to convert the display to number -- Number(display.innerText)
// everytime an operator is clicked, the numerical version of the display.innertext will be received by a variable so that in the final moment when equals is clicked, it will be used to do the operation