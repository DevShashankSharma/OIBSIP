let currentInput = "";
let operator = "";
let operand1 = "";

function appendInput(value) {
  currentInput += value;
  updateDisplay();
}

function setOperator(op) {
  if (currentInput !== "") {
    if (operand1 === "") {
      operand1 = currentInput;
      currentInput += op;
      operator = op;
    }
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = "";
  operator = "";
  operand1 = "";
  updateDisplay();
}

function calculate() {
  if (currentInput !== "" && operator !== "" && operand1 !== "") {
    currentInput = currentInput.split(operator)[1];
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(currentInput);

    switch (operator) {
      case "+":
        currentInput = (num1 + num2).toString();
        break;
      case "-":
        currentInput = (num1 - num2).toString();
        break;
      case "*":
        currentInput = (num1 * num2).toString();
        break;
      case "/":
        if (num2 !== 0) {
          currentInput = (num1 / num2).toString();
        } else {
          currentInput = "Error";
        }
        break;
      default:
        break;
    }

    operator = "";
    operand1 = "";
    updateDisplay();
  }
}

function calculateSquare() {
  if (currentInput !== "") {
    const num = parseFloat(currentInput);
    currentInput = (num * num).toString();
    updateDisplay();
  }
}

function calculateReciprocal() {
  if (currentInput !== "") {
    const num = parseFloat(currentInput);
    if (num !== 0) {
      currentInput = (1 / num).toString();
    } else {
      currentInput = "Error";
    }
    updateDisplay();
  }
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculatePercentage() {
  if (currentInput !== "") {
    const num = parseFloat(currentInput);
    currentInput = (num / 100).toString();
    updateDisplay();
  }
}

function calculateSquareRoot() {
  if (currentInput !== "") {
    const num = parseFloat(currentInput);
    if (num >= 0) {
      currentInput = Math.sqrt(num).toString();
    } else {
      currentInput = "Error";
    }
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById("display").textContent = currentInput || "0";
}
