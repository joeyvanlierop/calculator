let screen = document.getElementById("calculatorScreen");
let calculatorButtons = document.getElementsByTagName("button");

for(let calculatorButton of calculatorButtons) {
  calculatorButton.addEventListener("click", function() { addToScreen(calculatorButton.value) });
}

function addToScreen(character) {
  screen.value += character;
}

function clearScreen() {
  screen.value = "";
}

function add(number1: Number, number2: Number): Number {
  return number1 + number2;
}

function subtract(number1: Number, number2: Number): Number {
  return number1 - number2;
}

function multiply(number1: Number, number2: Number): Number {
  return number1 * number2;
}

function divide(number1: Number, number2: Number): Number {
  return number1 / number2;
}

function operate(number1: Number, number2:  Number, operator: string): Number {
  if(typeof number1 != Number | typeof number2 != Number) {
    return `Invalid Input`
  }

  switch(operator) {
    case '+':
      return add(number1, number2);
    case '-':
      return subtract(number1, number2);
    case '*':
      return multiply(number1, number2);
    case '/':
      return divide(number1, number2);
    default:
      return `Invalid Operator: ${operator}`
  }
}
