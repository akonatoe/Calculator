const display = document.getElementById("display");
const equal = document.getElementById("equalBtn");

const calcuBtn = document.querySelectorAll(".calcu-btn");


let operatorList = [];
let sequence = []

const symbols = ['+', '-', '*', '/', '.']; //used as condition only
const operators = ['+', '-', '*', '/']; //used for checking operators only
const mathDiv = ['*', '/'];
const plusMin = ['+', ''];

calcuBtn.forEach(btn => {
    btn.addEventListener("click", function() {
        const btnValue = btn.innerText;
        let position = display.innerText.length;
        

        if (display.innerText == '0'){
            if (symbols.includes(btnValue)){
                display.innerText += btnValue;
                
                operatorList.push({
                    symbol: btnValue,
                    index: position
                });
                console.log(operatorList[0])
            }
            else{
                display.innerText = btnValue;
            }
            return;
        } //FOR 0-START validation [MAIN IF 1]


        //if last index sa dislplay is SYMBOL / OPERATOR, then change it to the new operator
        if (symbols.includes(display.innerText.slice(-1))){
            if(symbols.includes(btnValue)){
                display.innerText = display.innerText.slice(0, -1);
                display.innerText += btnValue;

                operatorList.pop();
                operatorList.push({
                    symbol: btnValue,
                    index: position
                });
                
            }
            else if(!symbols.includes(btnValue)){
                display.innerText += btnValue;
            }            
        }//MAIN IF 2

        //if display is NOT 0 or if the last char is NOT AN OPERATOR, meaning a number
        else if (!symbols.includes(display.innerText.slice(-1))){
            display.innerText += btnValue;

            if (operators.includes(btnValue)) {
                operatorList.push({ 
                    symbol: btnValue, 
                    index: position 
                });
            }
        }//ELSE IF OF MAIN 2

        
    })
 
});//END OF FOREACH LOOP

equal.addEventListener("click", function(){

    let answer = 0;


    for (let i = 0; i <= operatorList.length; i++){
        if (mathDiv.includes(operatorList[i].symbol)){
            switch(operatorList[i].symbol){
                case '*':
                    console.log(Number(display.innerText[operatorList[i-1].index + 1]), "*", Number(display.innerText[operatorList[i+1].index - 1], "="));
                    answer = Number(display.innerText.slice(operatorList[i-1].index + 1, operatorList[i].index)) * Number(display.innerText.slice(operatorList[i].index + 1, operatorList[i+1].index));
                    display.innerText = answer;
            }
        }
    }



            // answer = Number(display.innerText.slice(0, operatorList[0].index)) + Number(display.innerText.slice(operatorList[0].index + 1));

    console.log(`Result: ${answer}`);
    display.innerText = answer;
})


