
let mainDisplay = document.querySelector(".main-display");
let miniDisplay = document.querySelector(".mini-display");

let keyNum = document.querySelectorAll(".key-num");

let defaultZero = true;

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