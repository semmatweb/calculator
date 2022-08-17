const expression = document.querySelector('.exp');
const result = document.querySelector('.result');
const num = document.querySelectorAll('.num');
const dot = document.querySelector('.dot');

const ce = document.getElementById('ce-btn');
const clearBtn = document.getElementById('clear-btn');

const operator = document.querySelectorAll('.operator');

const equals = document.getElementById('equals');

const negateBtn = document.querySelector('.negate');

const backBtn = document.querySelector('.bkspc');

const percentBtn = document.querySelector('.percent');

const sqrtBtn = document.querySelector('.sqrt');

const squareVal = document.querySelector('.sq-btn');

const inverseBtn = document.getElementById('inverse');

let value;

// m btns
const memoryElHidden = document.querySelectorAll('.m-hidden');
const memoryPlus = document.querySelectorAll('.m-plus');
const mClear = document.querySelector('.m-clear');

// flags
let operatorFlag = false;
let decimalFlag = false;
let equalFlag = false;

//CE btn
ce.addEventListener('click', function() {
    result.textContent = 0;
    decimalFlag = false;
})

// clear btn
clearBtn.addEventListener('click', function() {
    result.textContent = 0;
    expression.textContent = '';
    decimalFlag = false;
})

// negate btn
negateBtn.addEventListener('click', function(){
    result.textContent *= -1;
})

// % btn
percentBtn.addEventListener('click', ()=>{
    result.textContent /= 100;
    resultSlice();
})

// sqrt btn
sqrtBtn.addEventListener('click', ()=>{
    result.textContent = Math.sqrt(result.textContent);
    resultSlice();
})

// inverse btn
inverseBtn.addEventListener('click', ()=>{
    result.textContent = 1 / result.textContent;
    resultSlice();
})

// square btn
squareVal.addEventListener('click', ()=>{
    result.textContent *= result.textContent;
    resultSlice();
})

// backspc btn
backBtn.addEventListener('click', ()=>{
    if (equalFlag == false) {
        if (result.textContent !== "0") {
            let res = result.textContent;
            if (res.length !== 1) {
                // get last char of the string
                let lastChar = res.charAt(res.length - 1);
                
                // sets the decimal flag to false so decimal can be added again
                if (lastChar == ".") {
                    decimalFlag = false;
                }
    
                // replace the last char with an empty string
                let inc = res.slice(0, -1);
                result.textContent = inc;
            } else {
                result.textContent = "0";
            }
        }
    }
})

// on click of numbers...
num.forEach(function(val) {
    val.addEventListener('click', function(){
        if (operatorFlag == false) {
            if (result.textContent === "0") {
                result.textContent = val.textContent;
            } else {
                result.textContent += val.textContent;
            }
            resultSlice();
        } else {
            // check if operator has been clicked
            result.textContent = val.textContent;
            operatorFlag = false;
        }

        if (equalFlag == true) {
            expression.textContent = "";
            equalFlag = false;
        }
    })
})


// decimal
dot.addEventListener('click', ()=>{
    if (decimalFlag == false) {
        if (result.textContent === "0" || operatorFlag == true) {
            operatorFlag = false;
            result.textContent = "0.";
        } else {
            result.textContent += '.';
        }
        decimalFlag = true;
    }
})

// operators
operator.forEach(function(val) {
    val.addEventListener('click', function(){
        if (operatorFlag == false) {
            operatorFlag = true;
            expression.textContent += result.textContent + " " + val.textContent + " ";

            value = expression.textContent;
            
            value = value.slice(0, -2);
            
            if (value.includes("×")) {
                value = value.replaceAll("×", "*");
            }
            if (value.includes("÷")) {
                value = value.replaceAll("÷", "/");
            }
            if (value.includes("−")) {
                value = value.replaceAll("−", "-");
            }

            result.textContent = calc(value);

            decimalFlag = false;

            if (equalFlag == true) {
                expression.textContent = result.textContent + " " + val.textContent + " ";
            }
            
            equalFlag = false;
        } else {
            // if operator is clicked multiple times, replace
            expression.textContent = expression.textContent.slice(0, -2) + " " + val.textContent + " ";
        }

        if (equalFlag == true) {
            expression.textContent = result.textContent + " " + val.textContent + " ";
            equalFlag = false;
        }
        
        console.log(operatorFlag);
        console.log(equalFlag);
    })
})

// equals
equals.addEventListener('click', ()=> {
    value = expression.textContent;
    let lastChar = value.charAt(value.length - 2);

    value = value.replace(lastChar, "");

    
    if (value.includes("×")) {
        value = value.replaceAll("×", "*");
    }
    if (value.includes("÷")) {
        value = value.replaceAll("÷", "/");
    }
    if (value.includes("−")) {
        value = value.replaceAll("−", "-");
    }

    console.log(value)

    result.textContent = calc(value);
    resultSlice();
    equalFlag = true;
})

// memory btns
memoryPlus.forEach((mBtn) => {
    mBtn.addEventListener("click", () => {
        const memCon = mBtn.parentNode;
        const memBtns = memCon.querySelectorAll(".m-btn");
        memBtns.forEach((mem) => {
            if (mem.classList.contains('m-hide')) {
                mem.classList.replace('m-hide', 'm-show');
            }
        })
    })

    mClear.addEventListener('click', ()=>{
        if (mClear.classList.contains('m-show')) {
            const memCon = mBtn.parentNode;
            const memBtns = memCon.querySelectorAll(".m-btn");
            memBtns.forEach((mem) => {
                if (mem.classList.contains('m-show')) {
                    mem.classList.replace('m-show', 'm-hide');
                }
            })
        }
    })
})


function calc(fn) {
    return new Function('return ' + fn)();
}

// display only first ten digits on result con
function resultSlice() {
    if (result.textContent.length > 10) {
        result.textContent = result.textContent.slice(0, 10);
    }
//         result.style.fontSize = "35px";
//     } else if (result.textContent.length > 14) {
//         result.style.fontSize = "30px";
//     }
}