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

function updateUI(){
  display.innerText = dispStore.length > 0 ? dispStore.join("") : "0";
}

/* --- LOGIC FOR CLICKED NUMBERS AND OPERATORS AND DISPLAY --- */
calcuBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    let btnValue = btn.innerText;

    let lastIndex = dispStore.length - 1;
    let lastItem = dispStore[lastIndex];

    ///magulong part noon
    if (btnValue === "+/-") {
        if (lastItem === "0") return;

        else if (operators.includes(lastItem)) return;

        else if (lastItem.startsWith("-")){
          dispStore[lastIndex] = lastItem.slice(1);
        }

        else {
          dispStore[lastIndex] = "-" + lastItem;
        }
        
        updateUI();
        return;
    }

    //if ^
    if (btnValue == "^ Exp") {
      btnValue = "^";
    }

    if (btnValue === "." && !justCalculated) {
      if (lastItem.includes(".")) return;

      if (operators.includes(lastItem) || !lastItem) {
        dispStore.push("0.");
        updateUI();
        return;
      }
    }

    //REPLACE THE NUMBERS MADE BY THE EQUAL SIGN IF NUMBERS IS ENTERED BUT IF OPERATORS IS ENTERED, IT CONTINUES THE NUMBER
    if (justCalculated) {
      if (btnValue === "+/-") {
        if (lastItem.startsWith("-")){
          dispStore[lastIndex] = lastItem.slice(1);
        }
        else {
          dispStore[lastIndex] = "-" + lastItem;
        }
        updateUI();
        return;
      } else if (operators.includes(btnValue)) {
        dispStore.push(btnValue);
      } else if (btnValue == ".") {
        dispStore = ["0."];
      } else {
        dispStore = [btnValue];
      }
      justCalculated = false;
      updateUI();
      return;
    }

    //if currently ONLY '0' is in display
    if (display.innerText == "0") {
      if (symbols.includes(btnValue)) {
        dispStore.push(btnValue);
      } else {
        dispStore = [btnValue];
      }
      updateUI();
      return;
    }

    //if last index in display is SYMBOL / OPERATOR, then change it to the new operator
    if (symbols.includes(btnValue)) {
        if (symbols.includes(lastItem)) {
            dispStore[dispStore.length - 1] = btnValue; 
        } else {
            dispStore.push(btnValue);
        }
    } else {
        if (symbols.includes(lastItem)) {
            dispStore.push(btnValue);
        } else {
            dispStore[dispStore.length - 1] += btnValue;
        }
    }
    updateUI();

    //here should be the turn the whole display to splitted version (array) so the +/- can modify the last number entered

  });
}); //END OF FOREACH LOOP




/* --- LOGIC FOR EQUAL BUTTON --- */
equal.addEventListener("click", function () {
  let lastIndex = dispStore.length - 1; 
  let lastItem = dispStore[lastIndex];
  let answer = 0;

  if (dispStore.length === 0 || (dispStore.length === 1 && dispStore[0] === "0")) return; //stops anything else if display is empty

  //if last item in the display is an operator, remove it
  if (symbols.includes(lastItem)) {
    dispStore.pop();
  }

  console.log(dispStore)

  /* EMDAS RULE */
  //for Exponent
  for (let i = 0; i < dispStore.length; i++) {
    if (dispStore[i] == "^") {
      const exp1 = Number(dispStore[i - 1]);
      const exp2 = Number(dispStore[i + 1]);

      answer = exp1 ** exp2;

      dispStore.splice(i - 1, 3, String(answer));
      i--;
    }
  }

  //for MD
  for (let i = 0; i < dispStore.length; i++) {
    if (dispStore[i] == "*") {
      const mathDiv1 = Number(dispStore[i - 1]);
      const mathDiv2 = Number(dispStore[i + 1]);

      answer = mathDiv1 * mathDiv2;

      dispStore.splice(i - 1, 3, String(answer));
      i--;
    } else if (dispStore[i] == "/") {
      const mathDiv1 = Number(dispStore[i - 1]);
      const mathDiv2 = Number(dispStore[i + 1]);

      answer = mathDiv1 / mathDiv2;

      dispStore.splice(i - 1, 3, String(answer));
      i--;
    }
  }

  //for AS
  for (let i = 0; i < dispStore.length; i++) {
    if (dispStore[i] == "+") {
      const plusMin1 = Number(dispStore[i - 1]);
      const plusMin2 = Number(dispStore[i + 1]);

      answer = plusMin1 + plusMin2;

      dispStore.splice(i - 1, 3, String(answer));
      i--;
    } else if (dispStore[i] == "-") {
      const plusMin1 = Number(dispStore[i - 1]);
      const plusMin2 = Number(dispStore[i + 1]);

      answer = plusMin1 - plusMin2;

      dispStore.splice(i - 1, 3, String(answer));
      i--;
    }
  }

  console.log(`Result: ${dispStore}`);
  updateUI();
  justCalculated = true;
}); //END OF EQUAL EVENT LISTENER



clearSc.addEventListener("click", function () {
  dispStore = ["0"];
  updateUI();
});

deleteBtn.addEventListener("click", function () {
  let lastIndex = dispStore.length - 1;
  let lastItem = dispStore[lastIndex];

  if (dispStore.length === 0 || (dispStore.length === 1 && dispStore[0] === "0")) return;

  dispStore[lastIndex] = lastItem.slice(0, -1);

  if (dispStore[lastIndex] === "") {
    dispStore.pop();
  }

  if (dispStore.length === 0) {
    dispStore = ["0"];
  }

  updateUI();
});

arrows.forEach((arrs) => {
  arrs.addEventListener("click", function () {
    let arrsValue = arrs.innerText; 

    if (body.classList.contains("moveLeft")){
      if (arrsValue === "🡄"){
        return;
      }
      else if (arrsValue === "🡆") {
        body.classList.remove("moveLeft");
        lArrow.classList.remove("hidden");
      }
    }

    else if (body.classList.contains("moveRight")){
      if (arrsValue === "🡄"){
        body.classList.remove("moveRight");
        rArrow.classList.remove("hidden");
      }
      else if (arrsValue === "🡆") {
        return;
      }
    }

    else {
      if (arrsValue === "🡄"){
        body.classList.add("moveLeft");
        lArrow.classList.add("hidden");
      }
      else if (arrsValue === "🡆") {
        body.classList.add("moveRight");
        rArrow.classList.add("hidden");
      }
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
