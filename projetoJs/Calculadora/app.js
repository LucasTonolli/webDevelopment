function clearVisor() {
    document.getElementById('result').value = '';
}

function clearVariables() {
    clearVisor();
    firstValue = null;
    isOneNumber = true;
    secondValue = null
}

var firstValue = null;
var isOneNumber = true;
var showResult = false;
var operation;
var secondValue = null;

function addChar(value) {
    document.getElementById('result').value += value;
    if (isOneNumber) {
        firstValue = parseFloat(document.getElementById('result').value);
    } else {
        secondValue = parseFloat(document.getElementById('result').value);
        // calculate();
    }
}

function chooseOperation(operationOption) {

    if (isOneNumber) {
        isOneNumber = false;
    }
    clearVisor();

    switch (operationOption) {
        case '/': operation = '/';
            break;
        case '*': operation = '*';
            break;
        case '+': operation = '+';
            break;
        case '-': operation = '-';
            break;
    }


}

function calculate() {

    switch (operation) {
        case '/': document.getElementById('result').value = firstValue / secondValue;
            firstValue = firstValue / secondValue;
            break;
        case '*': document.getElementById('result').value = firstValue * secondValue;
            firstValue = firstValue * secondValue;
            break;
        case '+': document.getElementById('result').value = firstValue + secondValue;
            firstValue = firstValue + secondValue;
            break;
        case '-': document.getElementById('result').value = firstValue - secondValue;
            firstValue = firstValue - secondValue;
            break;
    }
}