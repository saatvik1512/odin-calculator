//select the operator buttons
const operatorButtons = document.querySelectorAll('.operatorbutton');

//select the screen which will show display
const displayScreen = document.querySelector('.screen');
displayScreen.innerHTML = 0;

const historyScreen = document.querySelector('.previous-history');

//create 3 variables for 3 parameters
let operator1, operand, operator2;

//button checker
let buttonClickCounter = 0;


//clicked => clears display
const clearButton = document.querySelector('.clearButton');
clearButton.onclick = () => {
    displayScreen.innerHTML = 0;
    historyScreen.innerHTML = "";
    operator1 = 0;
    operator2 = 0;
    operand = "";
    buttonClickCounter = 0;
    decimalButton.disabled = false;
}

const signChanger = document.querySelector('.negative');
signChanger.onclick = function (){
    displayScreen.innerHTML = Number(displayScreen.innerText) * -1;
}

const decimalButton = document.querySelector('.decimal');
decimalButton.classList.add('numberbutton')
decimalButton.onclick = function (){
    decimalButton.disabled = true;
}

const backSpace = document.querySelector('.cancelButton');
backSpace.onclick = function (){
    displayScreen.innerHTML = displayScreen.innerHTML.substring(0, displayScreen.innerHTML.length - 1);
    operator1 = displayScreen.textContent.slice(0, displayScreen.innerHTML.indexOf(operand));
    operand = displayScreen.textContent.slice(displayScreen.innerHTML.indexOf(operand), displayScreen.innerHTML.indexOf(operand)+1);
    operator2 = displayScreen.textContent.slice( displayScreen.innerHTML.indexOf(operand)+1);
}

//select the numbered buttons
const numberedButtons = document.querySelectorAll('.numberbutton');
for (const btn of numberedButtons){
    btn.addEventListener('click', (e) => {
        //if zero present => remove it
        if (displayScreen.innerHTML == 0){
            displayScreen.innerHTML = e.target.innerText;
        }
        else {
            displayScreen.innerHTML += e.target.innerText;
            operator2 += e.target.innerText;
        }
    })
}

for (const btn of operatorButtons){
    btn.addEventListener('click', (e) => {
        buttonClickCounter++;
        if(buttonClickCounter > 1){
            operator1 = operator(Number(operator1), operand, Number(operator2));
            displayScreen.innerHTML = operator1
        }
        operator1 = displayScreen.innerHTML;
        operand = e.target.innerHTML;
        operator2 = '';
        displayScreen.innerHTML += e.target.innerText;
        historyScreen.innerHTML = displayScreen.innerHTML;
        decimalButton.disabled = false;
    })
}

const equalButton = document.querySelector('.equalsbutton');
equalButton.addEventListener('click', (e) => {
    if (!operand || !operator1 || !operator2){
        displayScreen.innerHTML = "enter full parameters";
    }
    else {
        historyScreen.innerHTML = displayScreen.innerHTML;
        displayScreen.innerHTML = operator(Number(operator1), operand, Number(operator2));
        operator1 = Number(displayScreen.innerHTML);
        buttonClickCounter = 0;
        decimalButton.disabled = false;
    }

})

function operator(num1, sign, num2){
    switch (sign) {
        case "+":
            return add(num1, num2);
        case "-":
            return substract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

function add(a, b){
    return (Math.round(((a + b) + Number.EPSILON) * 100) / 100);;
}

function substract(a, b){
    return (Math.round(((a - b) + Number.EPSILON) * 100) / 100);
}

function multiply(a, b){
    return ((Math.round(((a * b) + Number.EPSILON) * 100) / 100))
}

function divide(a, b){
    if (b){
        return ((Math.round(((a / b) + Number.EPSILON) * 100) / 100));
    }
    return "LMAO"
}