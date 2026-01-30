const display = document.getElementById("display");
const equal = document.getElementById("equalBtn");

const calcuBtn = document.querySelectorAll(".calcu-btn");

// let operatorList = [];

const symbols = ['+', '-', '*', '/', '.']; //used as condition only
const operators = ['+', '-', '*', '/']; //used for checking operators only

calcuBtn.forEach(btn => {
    btn.addEventListener("click", function() {
        const btnValue = btn.innerText;
        let position = display.innerText.length;
        

        if (display.innerText == '0'){
            if (symbols.includes(btnValue)){
                display.innerText += btnValue;
                
            }
            else{
                display.innerText = btnValue;
            }
            return;
        } //FOR 0-START validation


        //if last index sa dislplay is SYMBOL / OPERATOR, then change it to the new operator
        if (symbols.includes(display.innerText.slice(-1))){
            if(symbols.includes(btnValue)){
                display.innerText = display.innerText.slice(0, -1);
                display.innerText += btnValue;
                
            }
            else if(!symbols.includes(btnValue)){
                display.innerText += btnValue;
            }            
        }

        //if display is NOT 0 or if the last char is NOT AN OPERATOR, meaning a number
        else if (!symbols.includes(display.innerText.slice(-1))){
            display.innerText += btnValue;

        }

        
    })
 
});//END OF FOREACH LOOP

equal.addEventListener("click", function(){

    let answer = 0;

    const dispSplit = display.innerText.split(/([+\-*/])/);
    //ex. '2', '+', '100', '*', '21', '-', '598', '/', '8'

    console.log(dispSplit)
    
    //for MD
    for(let i = 0; i < dispSplit.length; i++){

        if(dispSplit[i] == '*'){
            const mathDiv1 = Number(dispSplit[i-1]);
            const mathDiv2 = Number(dispSplit[i+1]);

            answer = mathDiv1 * mathDiv2;

            dispSplit.splice(i - 1, 3, answer);
            i--;
        }
        else if(dispSplit[i] == '/'){
            const mathDiv1 = Number(dispSplit[i-1]);
            const mathDiv2 = Number(dispSplit[i+1]);

            answer = mathDiv1 / mathDiv2;

            dispSplit.splice(i - 1, 3, answer);
            i--;
        }
    }

    //for AS
    for(let i = 0; i < dispSplit.length; i++){
        if(dispSplit[i] == '+'){
            const plusMin1 = Number(dispSplit[i-1]);
            const plusMin2 = Number(dispSplit[i+1]);
            
            answer = plusMin1 + plusMin2;

            dispSplit.splice(i - 1, 3, answer);
            i--;
        }
        else if(dispSplit[i] == '-'){
            const plusMin1 = Number(dispSplit[i-1]);
            const plusMin2 = Number(dispSplit[i+1]);

            answer = plusMin1 - plusMin2;

             dispSplit.splice(i - 1, 3, answer);
            i--;

        }
    }

    
    console.log(`Result: ${dispSplit}`);
    display.innerText = dispSplit;



//=====================================REDOOOOOOOOOOOOOOOOOOOOOOOOOO REDOOOOOOOOOOOOOOOOOOOOOOOO===================================================||

    // for (let i = 0; i <= operatorList.length; i++){
    //     if (mathDiv.includes(operatorList[i].symbol)){
    //         switch(operatorList[i].symbol){
    //             case '*':

                    // make an if else where if the oplist index i > 0 (meanign hindi sya ang unang operator), code below runs since safe. 
                    // // but if oplist index i == 0, then i cant do oplist[i-1 or i+1]
                    // // what i can do is if i == 0, to get the first number, slice(default start 0, oplist[i].index)

                    // //if operator is in the middle of 2 operators                
                    // if(operatorList.indexOf(operatorList[i].symbol) > operatorList.indexOf(operatorList[0].symbol) && operatorList.indexOf(operatorList[i].symbol < operatorList.indexOf(operatorList[-1].symbol)) ){
                    //     console.log(Number(display.innerText[operatorList[i-1].index + 1]), "*", Number(display.innerText[operatorList[i+1].index - 1], "="));
                    //     answer = Number(display.innerText.slice(operatorList[i-1].index + 1, operatorList[i].index)) * Number(display.innerText.slice(operatorList[i].index + 1, operatorList[i+1].index));
                    //     display.innerText = answer;
                    // }
                    // // if operator is the ONLY operator
                    // else if(operatorList.indexOf(operatorList[i].symbol) == operatorList.indexOf(operatorList[0].symbol)){
                    //     // what if yung operator i is wala nang operator sa kanan?
                    //     answer = Number.display.innerText.slice(operatorList[i].index) * Number.display.innerText.slice(operatorList[i].index)
                    // }
                    //there should be an if else for if the operator is on the most right or most left, correct?


                    //SHOULD I CHANGE MY CURRENT STRUCTURE WITH SPLIT??? RIGHT NOW, IM MANUALLY SPLITTING AND MAKING CONDITIONS FOR EACH OF THE PPOSSIBLE SITUATIONS WHICH IS MESSY AND CONFUSING

    //         }//end of swich case
    //     }
    // } REDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO (TOO MANUAL. I'LL USE SPLIT() AND MAKE IT AS SIMPLE AS POSSIBLE)

})//end of equal click addeventlistener


