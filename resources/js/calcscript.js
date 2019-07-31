"use strict";
var inputField = document.getElementById("calculatorInputField");
var outputField = document.getElementById("calculatorOutputField");
var calculatorButtons = document.getElementsByClassName("btn");
var _loop_1 = function (calculatorButton) {
    calculatorButton.addEventListener("click", function () {
        updateInput(calculatorButton.dataset.action);
    });
};
// @ts-ignore
for (var _i = 0, calculatorButtons_1 = calculatorButtons; _i < calculatorButtons_1.length; _i++) {
    var calculatorButton = calculatorButtons_1[_i];
    _loop_1(calculatorButton);
}
function updateInput(character) {
    switch (true) {
        case character == "del":
            inputField.value = inputField.value.slice(0, -1);
            updateOutput();
            break;
        case character == "=":
            inputField.value = outputField.value;
            updateOutput();
            break;
        case (isNaN(+character) && (isNaN(+inputField.value.slice(-1)) || inputField.value.length == 0)):
        case (character == "0" && inputField.value.slice(-1) == "0"):
            break;
        default:
            inputField.value += character;
            updateOutput();
    }
}
function updateOutput() {
    outputField.value = evaluateEquation(inputField.value.toString(), 3);
}
function clearScreen() {
    inputField.value = "Hi";
    outputField.value = "";
}
function add(number1, number2) {
    return number1 + number2;
}
function subtract(number1, number2) {
    return number1 - number2;
}
function multiply(number1, number2) {
    return number1 * number2;
}
function divide(number1, number2) {
    if (number2 == 0) {
        return undefined;
    }
    return number1 / number2;
}
function operate(number1, number2, operator) {
    switch (operator) {
        case '+':
            return add(number1, number2);
        case '-':
            return subtract(number1, number2);
        case '*':
            return multiply(number1, number2);
        case '/':
            return divide(number1, number2);
        default:
            return undefined;
    }
}
function splitEquation(input) {
    var operators = ['*', '/', '+', '-'];
    var equationArray = [];
    var equationArrayIndex = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var char = input_1[_i];
        if (operators.indexOf(char) != -1) {
            equationArray.push(char);
            equationArrayIndex += 2;
        }
        else if (equationArray[equationArrayIndex] == undefined) {
            equationArray.push(char);
        }
        else {
            equationArray[equationArrayIndex] += char;
        }
    }
    while (isNaN(+equationArray[equationArray.length - 1]) && equationArray.length >= 1) {
        equationArray.pop();
    }
    return equationArray;
}
function evaluateEquation(equationInput, decimalLength) {
    if (typeof equationInput == "string") {
        return evaluateEquation(splitEquation(equationInput), decimalLength);
    }
    var operatorOrder = [["*", "/"], ["+", "-"]];
    var index = -1;
    for (var _i = 0, operatorOrder_1 = operatorOrder; _i < operatorOrder_1.length; _i++) {
        var operators = operatorOrder_1[_i];
        for (var _a = 0, operators_1 = operators; _a < operators_1.length; _a++) {
            var operator = operators_1[_a];
            var operatorIndex = equationInput.indexOf(operator);
            if (operatorIndex > 0 && (operatorIndex < index || index == -1)) {
                index = operatorIndex;
            }
        }
        if (index != -1) {
            var result = operate(+equationInput[index - 1], +equationInput[index + 1], equationInput[index].toString());
            if (result != undefined) {
                equationInput[index + 1] = result;
                equationInput.splice(index - 1, 2);
                return evaluateEquation(equationInput, decimalLength);
            }
            else {
                return "Nice try";
            }
        }
    }
    return (equationInput[0] == undefined) ? "" : (parseFloat((+equationInput[0]).toFixed(decimalLength))).toString();
}
