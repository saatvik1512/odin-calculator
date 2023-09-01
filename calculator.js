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
    setEscape()
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
    backspaceOperator();
}

//select the numbered buttons
const numberedButtons = document.querySelectorAll('.numberbutton');
for (const btn of numberedButtons){
    btn.addEventListener('click', (e) => {
        getNumber(btn);
    })
}

for (const btn of operatorButtons){
    btn.addEventListener('click', (e) => {
        getOperator(btn);
    })
}

const equalButton = document.querySelector('.equalsbutton');
equalButton.addEventListener('click', () => {
    setAnswer()
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

function errorMessage(){
    if (displayScreen.innerHTML.includes("NaN") || displayScreen.innerHTML.includes("undefined") || displayScreen.innerHTML.includes("parameters")){
        document.querySelectorAll('#opbutton').forEach((btn) => {
            btn.disabled = true;
        })
    }
}


function getNumber(e){
    if (displayScreen.innerHTML == 0){
            displayScreen.innerHTML = e.innerText;
        }
        else {
            displayScreen.innerHTML += e.innerText;
            operator2 += e.innerText;
        }
}

function getOperator(e){
    buttonClickCounter++;
    if(buttonClickCounter > 1){
        operator1 = operator(Number(operator1), operand, Number(operator2));
        displayScreen.innerHTML = operator1
    }
    operator1 = displayScreen.innerHTML;
    operand = e.innerHTML;
    operator2 = '';
    displayScreen.innerHTML += e.innerText;
    historyScreen.innerHTML = displayScreen.innerHTML;
    decimalButton.disabled = false;
    errorMessage();
}

function setAnswer(){
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
    errorMessage();
}

function backspaceOperator(){
    buttonClickCounter--;
    displayScreen.innerHTML = displayScreen.innerHTML.substring(0, displayScreen.innerHTML.length - 1);
    operator1 = displayScreen.textContent.slice(0, displayScreen.innerHTML.indexOf(operand));
    operand = displayScreen.textContent.slice(displayScreen.innerHTML.indexOf(operand), displayScreen.innerHTML.indexOf(operand)+1);
    operator2 = displayScreen.textContent.slice( displayScreen.innerHTML.indexOf(operand)+1);
}

function setEscape(){
    displayScreen.innerHTML = 0;
    historyScreen.innerHTML = "";
    operator1 = 0;
    operator2 = 0;
    operand = "";
    buttonClickCounter = 0;
    decimalButton.disabled = false;
    document.querySelectorAll('#opbutton').forEach((btn) => {
        btn.disabled = false;
    })
}

window.addEventListener('keydown', (event) => {
    numberedButtons.forEach((item) => {
        if(event.key == item.innerText){
            getNumber(item)
        }
    })
    operatorButtons.forEach((item) => {
        if(event.key == item.innerText){
            getOperator(item)
        }
    })
    if(event.key == "Enter"){
        setAnswer();
    }
    else if(event.key == "Backspace"){
        backspaceOperator();
    }
    else if(event.key == "Escape") {
        setEscape();
    }
})