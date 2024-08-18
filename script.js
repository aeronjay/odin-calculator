
let mainDisplay = document.querySelector(".main-display");
let miniDisplay = document.querySelector(".mini-display");
let operators = document.querySelectorAll(".operator-btn");
let deleteButton = document.querySelector(".delete-btn");
let keyNum = document.querySelectorAll(".key-num");

let defaultZero = true;
let hasOperator = false;
let operand1 = ["", ""], operand2;

keyNum.forEach((key) => {
    key.addEventListener("click", (e) => {
        if(defaultZero){
            // will not add more zeroes if 0 is the starting num
            if(!(e.target.textContent === "0" && defaultZero)){ 
                mainDisplay.textContent = key.textContent;
                defaultZero = false;
            }
        }else{
            mainDisplay.textContent += key.textContent;
        }
    })
})
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        let currentOperation = e.target.textContent;
        if(operand1[1] === ""){
            operand1[0] = mainDisplay.textContent;
            operand1[1] = currentOperation;
            miniDisplay.textContent = operand1.join("");
            mainDisplay.textContent = "0";
            defaultZero = true;
        }else if(mainDisplay.textContent === "0" && defaultZero){
            operand1[1] = currentOperation;
            miniDisplay.textContent = operand1.join("");
        }else{

        }
        
    })
})


