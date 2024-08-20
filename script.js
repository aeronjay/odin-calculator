
let mainDisplay = document.querySelector(".main-display");
let miniDisplay = document.querySelector(".mini-display");
let operators = document.querySelectorAll(".operator-btn");
let deleteButton = document.querySelector(".delete-btn");
let keyNum = document.querySelectorAll(".key-num");
let equate = document.querySelector(".equals-operator");
let clear = document.querySelectorAll(".clear");

let defaultZero = true;
let hasOperator = false;
let operand1 = ["", ""], operand2;
let calcu = new Calculator;

mainDisplay.textContent = "0";
miniDisplay.textContent = "";

keyNum.forEach((key) => {
    key.addEventListener("click", (e) => {
        if(defaultZero){
            // will not add more zeroes if 0 is the starting num
            if(!(e.target.textContent === "0" && defaultZero)){ 
                mainDisplay.textContent = key.textContent;
                defaultZero = false;
            }
        }else{
            if(e.target.textContent === "."){
                if(!(mainDisplay.textContent.includes("."))){
                    mainDisplay.textContent += key.textContent;
                }
            }else{
                mainDisplay.textContent += key.textContent;
            }
            
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
            operand2 = "0";
            hasOperator = true;
            defaultZero = true;
        }else if(mainDisplay.textContent === "0" && defaultZero){
            operand1[1] = currentOperation;
            miniDisplay.textContent = operand1.join("");
        }else{
            operand2 = mainDisplay.textContent;
            let result = calcu.calculate(operand2, operand1[1], operand1[0]);
            operand1[0] = result;
            operand1[1] = e.target.textContent;
            miniDisplay.textContent = operand1.join("");
            mainDisplay.textContent = "0";
            defaultZero = true;
            hasOperator = true;
        }
        
    })
})
function Calculator() {
    this.methods = {
        "+":(a,b) => (parseFloat(a) + parseFloat(b)),
        "-":(a,b) => (parseFloat(a) - parseFloat(b)),
        "*":(a,b) => (parseFloat(a) * parseFloat(b)),
        "/":(a,b) => (parseFloat(a) / parseFloat(b)),
    }
    this.calculate = (operand1, operator, operand2) => {
        console.log(`${operand2} ${operator} ${operand1}`)
        if(!this.methods[operator] || isNaN(parseFloat(operand1)) || isNaN(operand2)){
            return "ERROR";
        }
        return this.methods[operator](operand2, operand1);
    }
    this.addMethod = (name, callback) => {
        this.methods[name] = callback;
    }
}
equate.addEventListener("click", (e) => {
    operand2 = mainDisplay.textContent;
    mainDisplay.textContent = calcu.calculate(operand2, operand1[1], operand1[0]);
    miniDisplay.textContent = "";
    currentOperation = "";
    operand1[1] = "";
})

deleteButton.addEventListener("click", (e) => {
    if(mainDisplay.textContent.length > 0){
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    }else if(hasOperator && miniDisplay.textContent !== "" && mainDisplay.textContent === ""){
        mainDisplay.textContent = miniDisplay.textContent.slice(0, -1);
        currentOperation = "";
        miniDisplay.textContent = "";
        hasOperator = false;
        operand2 = "";
        operand1 = ["", ""];
    }
    
})
clear.forEach((element) => {
    element.addEventListener("click", (e) =>{
        if(element.textContent === "C"){
            mainDisplay.textContent = "";
            operand2 = "";
        }else{
            defaultZero = true;
            miniDisplay.textContent = "";
            mainDisplay.textContent = "0";
            currentOperation = "";
            operand2 = "";
            operand1 = ["", ""];
            hasOperator = false;
        }
    })
})