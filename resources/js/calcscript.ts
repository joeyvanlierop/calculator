const operators: string[] = ['*', '/', '+', '-']

let inputField = document.getElementById("calculatorInputField") as HTMLInputElement;
let outputField = document.getElementById("calculatorOutputField") as HTMLInputElement;
let calculatorButtons = document.getElementsByClassName("btn") as HTMLCollectionOf<HTMLInputElement>;

for(let calculatorButton of calculatorButtons) {
  calculatorButton.addEventListener("click", function() {
    updateInput(calculatorButton.dataset.action);
  });
}

function updateInput(character: string) {  
  switch(true) {
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
  inputField.value = "";
  outputField.value = "";
}

function add(number1: number, number2: number): number {
  return number1 + number2;
}

function subtract(number1: number, number2: number): number {
  return number1 - number2;
}

function multiply(number1: number, number2: number): number {
  return number1 * number2;
}

function divide(number1: number, number2: number): number | undefined {
  if(number2 == 0) {
    return undefined;
  }

  return number1 / number2;
}

function operate(number1: number, number2:  number, operator: string): number | undefined {
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
      return undefined;
  }
}

function splitEquation(input: string): string[] {
  let equationArray: string[] = [];
  let equationArrayIndex = 0;

  for (const char of input) {
    if(operators.indexOf(char) != -1) {
      equationArray.push(char);
      equationArrayIndex += 2;
    } else {
    if(equationArray[equationArrayIndex] == undefined) {
      equationArray.push(char);
    } else {
      equationArray[equationArrayIndex] += char;
    }
    }
  }

  while(isNaN(+equationArray[equationArray.length - 1]) && equationArray.length >= 1) {
    equationArray.pop();
  }

  return equationArray;
}

function evaluateEquation(equationInput: (string|number)[] | string, decimalLength: number): string {
  if(typeof equationInput == "string") {
    return evaluateEquation(splitEquation(equationInput), decimalLength);
  }

  let index: number = -1;

  for(let operator of operators) {
    index = equationInput.indexOf(operator);
    
    if(index != -1) {
      let result = operate(+equationInput[index - 1], +equationInput[index + 1], operator);

      if(result != undefined) {
        equationInput[index + 1] = result;
        equationInput.splice(index - 1, 2);
        
        return evaluateEquation(equationInput, decimalLength);
      } else {
        return "Nice try"
      }
    }
  }

  return (equationInput[0] == undefined) ? "" : (parseFloat((+equationInput[0]).toFixed(decimalLength))).toString();
}