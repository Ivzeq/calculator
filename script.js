// Operations

function add(number1,number2){
    return number1+number2;
}
function substract(minuend,subtrahend){
    return minuend-subtrahend;
}
function multiply(number1,number2){
    return number1*number2;
}
function divide(dividend,divisor){
    return dividend/divisor;
}
function power(base,exponent){
    return base**exponent;
}
function operate(operator,number1,number2){
    return(
        operator == '+'? add(parseFloat(number1),parseFloat(number2)):
        operator == '-'? substract(parseFloat(number1),parseFloat(number2)): 
        operator == 'x'? multiply(parseFloat(number1),parseFloat(number2)):
        operator == '/'? divide(parseFloat(number1),parseFloat(number2)):
        operator == '^'? power(parseFloat(number1),parseFloat(number2)):
        null
    );
}

// Events and logic

function changeStep(processStep){
    calculator.step = processStep;
}

function numberEvent(e){
    if (calculator.step == 'firstOperand') {
        calculator.firstOperand == '0'? 
        calculator.firstOperand = e.target.textContent:
        calculator.firstOperand += e.target.textContent;
        resultDisplay.textContent = calculator.firstOperand;
    }
    else if (calculator.step == 'secondOperand') {
        calculator.secondOperand == '0'? 
        calculator.secondOperand = e.target.textContent:
        calculator.secondOperand += e.target.textContent;
        resultDisplay.textContent = calculator.firstOperand + calculator.operator + calculator.secondOperand;
    }
    else if (calculator.step == 'result') {
        calculator.firstOperand = e.target.textContent;
        calculator.secondOperand = '0';
        changeStep('firstOperand');
        resultDisplay.textContent = calculator.firstOperand; 
    }
}

function operatorEvent(e) {
    if (calculator.step == 'firstOperand') {
        changeStep('secondOperand');
        calculator.operator = e.target.textContent;
    }
    else if (calculator.step == 'secondOperand') {
        equalsEvent()
        calculator.firstOperand = Math.round(calculator.result*100)/100;
        calculator.operator = e.target.textContent;
        calculator.secondOperand = '0';
        resultDisplay.textContent = calculator.result;
        changeStep('secondOperand')
    }
    else if (calculator.step == 'result') {
        calculator.firstOperand = Math.round(calculator.result*100)/100;
        calculator.operator = e.target.textContent;
        calculator.secondOperand = '0';
        changeStep('secondOperand');
    }
    resultDisplay.textContent = calculator.firstOperand + calculator.operator;
}


function equalsEvent(){
    if (calculator.operator != null) {
        changeStep('result');
        calculator.result = operate(calculator.operator, calculator.firstOperand, calculator.secondOperand)

        resultDisplay.textContent = Math.round(calculator.result*100)/100;
    }
}

function clearEvent(){
    changeStep('firstOperand');
    calculator.firstOperand = 0;
    calculator.secondOperand = 0; 
    calculator.operator = null;
    calculator.result = 0;

    resultDisplay.textContent = calculator.result;
}

function decimalEvent(e){

    if (calculator.step == 'firstOperand') {
        if (calculator.firstOperand.includes('.') == false) {
            calculator.firstOperand += e.target.textContent;
            resultDisplay.textContent = calculator.firstOperand;
        }
    }
    else if (calculator.step == 'secondOperand') {
        if (calculator.secondOperand.includes('.') == false) {
            calculator.secondOperand += e.target.textContent;
            resultDisplay.textContent = calculator.firstOperand + calculator.operator + calculator.secondOperand;
        }
    }
}

function deleteEvent(){
    if (calculator.step == 'firstOperand') {
        calculator.firstOperand = calculator.firstOperand.slice(0,-1);
        resultDisplay.textContent = calculator.firstOperand;
    }
    else if (calculator.step == 'secondOperand') {
        calculator.secondOperand = calculator.secondOperand.slice(0,-1);
        resultDisplay.textContent = calculator.firstOperand + calculator.operator + calculator.secondOperand;
    }
}
//------------------------------------------------------------------------

let calculator = {
    firstOperand : 0,
    secondOperand : 0,
    operator : null,
    result : 0,
    step : 'firstOperand',
};

const resultDisplay = document.querySelector('.result-display');
const equalsButton = document.querySelectorAll('.equals');
const clearButton = document.querySelectorAll('.clear');
const deleteButton = document.querySelectorAll('.delete');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')
const decimalButton = document.querySelectorAll('.decimal')

resultDisplay.textContent = calculator.result;

numbers.forEach((button) =>{
    button.addEventListener('click', numberEvent)
});
operators.forEach((button) =>{
    button.addEventListener('click', operatorEvent)
});
clearButton.forEach((button) =>{
    button.addEventListener('click', clearEvent)
});
equalsButton.forEach((button) =>{
    button.addEventListener('click', equalsEvent)
});
decimalButton.forEach((button) => {
    button.addEventListener('click', decimalEvent);
})
deleteButton.forEach((button) =>{
    button.addEventListener('click',deleteEvent);
})
window.addEventListener('keydown',(e) =>{
    if(e.key <= 9 && e.key >= 0) {
        document.querySelector('.n' + e.key).click();
    }
    else if(e.key == 'd' || e.key == '/'){
        document.querySelector('.divide').click();
    }
    else if(e.key == '*'){
        document.querySelector('.multiply').click();
    }
    else if(e.key == '+'){
        document.querySelector('.sum').click();
    }
    else if(e.key == '-'){
        document.querySelector('.substract').click();
    }
    else if(e.key == 'Enter'){
        document.querySelector('.equals').click();
    }
    else if(e.key == 'c' || e.key == 'Delete'){
        document.querySelector('.clear').click();
    }
    else if(e.key == '.'){
        document.querySelector('.decimal').click();
    }
    else if(e.key == 'Backspace'){
        document.querySelector('.delete').click();
    }
})