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
        operator == '*'? multiply(parseInt(number1),parseInt(number2)):
        operator == '/'? divide(parseInt(number1),parseInt(number2)):
        operator == '^'? power(parseInt(number1),parseInt(number2)):
        null
    );
}

console.log(operate('^',6,2));