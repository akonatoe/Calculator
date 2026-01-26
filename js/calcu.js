const display = document.getElementById("display");

const calcuBtn = document.querySelectorAll(".calcu-btn");


let operatorCount = 0;
let operatorList = [];

calcuBtn.forEach(btn => {


    btn.addEventListener("click", function() {
        const btnValue = btn.innerText;
        
        const symbols = ['+', '-', '*', '/', '.']; //used as condition only

        const operators = ['+', '-', '*', '/'] //used for checking operators only
        

        if (display.innerText == '0'){
            if (symbols.includes(btnValue)){
                display.innerText += btnValue;
                
                operatorCount++;
                operatorList.push(btnValue);    
                // need malaman ilang operator and pangilang index sa string yung mga symbols
            }
            else{
                display.innerText = btnValue;
                return;
            }
        } //FOR 0-START validation [MAIN IF 1]


        //if last index sa dislplay is SYMBOL / OPERATOR, then change it to the new operator
        if (symbols.includes(display.innerText.slice(-1))){
            if(symbols.includes(btnValue)){
                display.innerText = display.innerText.slice(0, -1);
                display.innerText += btnValue;
            }
            else if(!symbols.includes(btnValue)){
                display.innerText += btnValue; 
            }            
        }//MAIN IF 2

        //if display is NOT 0 or if the last char is NOT AN OPERATOR, meaning a number
        else if (!symbols.includes(display.innerText.slice(-1)) && display.innerText.length > 1){
            display.innerText += btnValue;
        }//ELSE IF OF MAIN 2

        if (display.innerText.length == 1){
            display.innerText += btnValue;
        }

        
    })
});
