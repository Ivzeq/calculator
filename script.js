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
        operator == '+'? add(parseInt(number1),parseInt(number2)):
        operator == '-'? substract(parseInt(number1),parseInt(number2)): 
        operator == 'x'? multiply(parseInt(number1),parseInt(number2)):
        operator == '/'? divide(parseInt(number1),parseInt(number2)):
        operator == '^'? power(parseInt(number1),parseInt(number2)):
        null
    );
}

// Events and logic

function changeStep(processStep){
    calculator.step = processStep;
}

function numberEvent(e){
    if (calculator.step == 'firstOperand') {
        calculator.firstOperand == 0? 
        calculator.firstOperand = e.target.textContent:
        calculator.firstOperand += e.target.textContent;
        resultDisplay.textContent = calculator.firstOperand;
    }
    else if (calculator.step == 'secondOperand') {
        calculator.secondOperand == 0? 
        calculator.secondOperand = e.target.textContent:
        calculator.secondOperand += e.target.textContent;
        resultDisplay.textContent = calculator.firstOperand + calculator.operator + calculator.secondOperand;
    }
    else if (calculator.step == 'result') {
        calculator.secondOperand = e.target.textContent;
        changeStep('secondOperand');
        resultDisplay.textContent = calculator.firstOperand + calculator.operator + calculator.secondOperand;
    }
}

function operatorEvent(e) {
    if (calculator.step == 'firstOperand') {
        changeStep('secondOperand');
        calculator.operator = e.target.textContent;
    }
    else if (calculator.step == 'secondOperand') {
        equalsEvent()
        
        calculator.firstOperand = calculator.result;
        calculator.operator = e.target.textContent;
        resultDisplay.textContent = calculator.result;
    }
    else if (calculator.step == 'result') {
        calculator.firstOperand = calculator.result;
        calculator.operator = e.target.textContent;
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
const deleteButton = document.querySelectorAll('delete');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')

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