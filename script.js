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

function operate(operator,number1,number2){
    return(
        operator == '+'? add(parseInt(number1),parseInt(number2)):
        operator == '-'? substract(parseInt(number1),parseInt(number2)): 
        operator == '*'? multiply(parseInt(number1),parseInt(number2)):
        operator == '/'? divide(parseInt(number1),parseInt(number2)):
        null
    );
}

console.log(operate(prompt(),prompt(),prompt()));