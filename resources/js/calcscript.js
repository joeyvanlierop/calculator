"use strict";
var screen = document.getElementById("calculatorScreen");
var calculatorButtons = document.getElementsByTagName("button");
var _loop_1 = function (calculatorButton) {
    calculatorButton.addEventListener("click", function () { addToScreen(calculatorButton.value); });
};
for (var _i = 0, calculatorButtons_1 = calculatorButtons; _i < calculatorButtons_1.length; _i++) {
    var calculatorButton = calculatorButtons_1[_i];
    _loop_1(calculatorButton);
}
function addToScreen(character) {
    screen.value += character;
}
function clearScreen() {
    screen.value = "";
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
    return number1 / number2;
}
function operate(number1, number2, operator) {
    if (typeof number1 != Number | typeof number2 != Number) {
        return "Invalid Input";
    }
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
            return "Invalid Operator: " + operator;
    }
}
