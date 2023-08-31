//select the numbered buttons
const numberedButtons = document.querySelectorAll('.numberbutton');

//select the operator buttons
const operatorButtons = document.querySelectorAll('.operatorbutton');

//select the screen which will show display
const displayScreen = document.querySelector('.screen');
displayScreen.innerHTML = 0;

//create 3 variables for 3 parameters
let operator1, operand, operator2;

//button checker
let buttonClickCounter = 0;

//clicked => clears display
const clearButton = document.querySelector('.clearButton');
clearButton.onclick = () => {
    displayScreen.innerHTML = 0;
    operator1 = 0;
    operator2 = 0;
    operand = "";
    buttonClickCounter = 0;
}

const signChanger = document.querySelector('.negative');
signChanger.onclick = function (){
    displayScreen.innerHTML = Number(displayScreen.innerText) * -1;
}

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
        // when user clicks operator button more than one time 
            //operator1 must be the result of previous 
            //operator2 must be 0
        if(buttonClickCounter > 1){
            operator1 = operator(Number(operator1), operand, Number(operator2));
            displayScreen.innerHTML = operator1
        }
        operator1 = displayScreen.innerHTML;
        operand = e.target.innerHTML;
        operator2 = 0;
        displayScreen.innerHTML += e.target.innerText;
    })
}

const equalButton = document.querySelector('.equalsbutton');
equalButton.addEventListener('click', () => {
    displayScreen.innerHTML = operator(Number(operator1), operand, Number(operator2));
})

function operator(num1, sign, num2){
    if (sign == '+'){
        return add(num1, num2);
    }
    else if (sign == '-')
    {
        return substract(num1, num2);
    }
}

function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}