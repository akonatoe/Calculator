const display = document.getElementById("display");
const equal = document.getElementById("equalBtn");

const calcuBtn = document.querySelectorAll(".calcu-btn");

const clearSc = document.getElementById("clearDisplayBtn");
const deleteBtn = document.getElementById("deleteBtn");

const arrows = document.querySelectorAll(".arrow");
const body = document.body;
const rArrow = document.getElementById("right-arrow");
const lArrow = document.getElementById("left-arrow");
// let operatorList = [];

const operators = ["+", "-", "*", "/", "^"]; //used for checking operators only
const symbols = [...operators, "."]; //used as condition only

let dispStore = ["0"];
let justCalculated = false;

/* --- LOGIC FOR CLICKED NUMBERS AND OPERATORS AND DISPLAY --- */
calcuBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    let btnValue = btn.innerText;

    ///magulong part
    // if (btnValue === "+/-"){

    //   let parts = display.innerText.split(/([+\-*/^])/);
    //   //nasa string splitting ang problemaaa if di nya madistinguish ang negative at minus nang maayos, di maayos ang splitting

    //   let lastIndex = parts.length - 1;
    //   let lastPart = parts[lastIndex];

    //   if (!lastPart || operators.includes(lastPart)) return;

    //   if (parts[lastIndex].startsWith("-")){
    //     parts[lastIndex] = parts[lastIndex].slice(1);
    //   } else {
    //     parts[lastIndex] = "-" + parts[lastIndex];
    //   }
    //   console.log(parts, lastIndex, parts[lastIndex]);

    //   display.innerText = parts.join("");
    //   return;
    // }

    //if ^
    if (btnValue == "^ Exp") {
      btnValue = "^";
    }

    //REPLACE THE NUMBERS MADE BY THE EQUAL SIGN IF NUMBERS IS ENTERED BUT IF OPERATORS IS ENTERED, IT CONTINUES THE NUMBER
    if (justCalculated) {
      if (operators.includes(btnValue)) {
        display.innerText += btnValue;
      } else if (btnValue == ".") {
        display.innerText = "0.";
      } else {
        display.innerText = btnValue;
      }
      justCalculated = false;
      return;
    }

    //if currently ONLY '0' is in display
    if (display.innerText == "0") {
      if (symbols.includes(btnValue) && btnValue !== "+/-") {
        display.innerText += btnValue;
      } else {
        display.innerText = btnValue;
      }
      return;
    }

    //if last index in display is SYMBOL / OPERATOR, then change it to the new operator
    if (symbols.includes(display.innerText.slice(-1))) {
      if (btnValue === "+/-"){
        return;
      } else if (symbols.includes(btnValue)) {
        display.innerText = display.innerText.slice(0, -1);
        display.innerText += btnValue;
      } else if (!symbols.includes(btnValue)) {
        display.innerText += btnValue;
      }
    }
    //if last character in display is a number
    else if (!symbols.includes(display.innerText.slice(-1)) && btnValue !== "+/-") {
      display.innerText += btnValue;
    }

    //here should be the turn the whole display to splitted version (array) so the +/- can modify the last number entered


  });
}); //END OF FOREACH LOOP




/* --- LOGIC FOR EQUAL BUTTON --- */
equal.addEventListener("click", function () {
  
  if (!display.innerText) return; //stops anything else if display is empty

  let answer = 0;

  let dispSplit = display.innerText.split(/([+\-*^/])/);
  // isa pa tong problema na to. di masplit maayos so nagiging 1+" "-1 imbes na 1 + (-1)
  //ex. ['1', '+', '', '-', '1', '+', '', '-', '2', '+', '', '-', '3', '+', '-4']

  //if last item in the display is an operator, remove it
  if (symbols.includes(dispSplit.at(-1))) {
    dispSplit = dispSplit.slice(0, -1);
  }

  console.log(dispSplit);

  /* EMDAS RULE */
  //for Exponent
  for (let i = 0; i < dispSplit.length; i++) {
    if (dispSplit[i] == "^") {
      const exp1 = Number(dispSplit[i - 1]);
      const exp2 = Number(dispSplit[i + 1]);

      answer = exp1 ** exp2;

      dispSplit.splice(i - 1, 3, answer);
      i--;
    }
  }

  //for MD
  for (let i = 0; i < dispSplit.length; i++) {
    if (dispSplit[i] == "*") {
      const mathDiv1 = Number(dispSplit[i - 1]);
      const mathDiv2 = Number(dispSplit[i + 1]);

      answer = mathDiv1 * mathDiv2;

      dispSplit.splice(i - 1, 3, answer);
      i--;
    } else if (dispSplit[i] == "/") {
      const mathDiv1 = Number(dispSplit[i - 1]);
      const mathDiv2 = Number(dispSplit[i + 1]);

      answer = mathDiv1 / mathDiv2;

      dispSplit.splice(i - 1, 3, answer);
      i--;
    }
  }

  //for AS
  for (let i = 0; i < dispSplit.length; i++) {
    if (dispSplit[i] == "+") {
      const plusMin1 = Number(dispSplit[i - 1]);
      const plusMin2 = Number(dispSplit[i + 1]);

      answer = plusMin1 + plusMin2;

      dispSplit.splice(i - 1, 3, answer);
      i--;
    } else if (dispSplit[i] == "-") {
      const plusMin1 = Number(dispSplit[i - 1]);
      const plusMin2 = Number(dispSplit[i + 1]);

      answer = plusMin1 - plusMin2;

      dispSplit.splice(i - 1, 3, answer);
      i--;
    }
  }

  console.log(`Result: ${dispSplit}`);
  display.innerText = dispSplit[0];
  justCalculated = true;
}); //END OF EQUAL EVENT LISTENER

clearSc.addEventListener("click", function () {
  display.innerText = 0;
});

deleteBtn.addEventListener("click", function () {
  if (display.innerText == "0") return;
  else {
    display.innerText = display.innerText.slice(0, -1);
  }
});

arrows.forEach((arrs) => {
  arrs.addEventListener("click", function () {
    let arrsValue = arrs.innerText;

    // Always reset first
    body.classList.remove("moveLeft", "moveRight");

    if (arrsValue === "🡄") {
      body.classList.add("moveLeft");
      lArrow.classList.add("hidden");
      rArrow.classList.remove("hidden");
    } else if (arrsValue === "🡆") {
      body.classList.add("moveRight");
      rArrow.classList.add("hidden");
      lArrow.classList.remove("hidden");
    }
  });
});

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
