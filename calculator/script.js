const display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let currentOperation = null;

document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.num) appendNumber(button.dataset.num);
        if (button.dataset.op) chooseOperation(button.dataset.op);
        updateDisplay();
    });
});

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput = currentInput === '0' ? number : currentInput + number;
}

function chooseOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') compute();
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperation) {
        case 'add': computation = prev + current; break;
        case 'subtract': computation = prev - current; break;
        case 'multiply': computation = prev * current; break;
        case 'divide': computation = prev / current; break;
        case 'percent': computation = (prev / 100) * current; break;
        default: return;
    }
    currentInput = computation.toString();
    currentOperation = null;
    previousInput = '';
}

function updateDisplay() {
    display.innerText = currentInput;
}

function clear() {
    currentInput = '0';
    previousInput = '';
    currentOperation = null;
}

function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handleSpecial(operation) {
    if (operation === 'clear') {
        clear();
    } else if (operation === 'sign') {
        currentInput = currentInput.startsWith('-') ? currentInput.substr(1) : '-' + currentInput;
    } else if (operation === 'percent') {
        currentInput = `${parseFloat(currentInput) / 100}`;
    }
}

function chooseOperation(operation) {
    if (currentInput === '') return;
    if (operation === 'equal') {
        compute();
        return;
    }
    if (previousInput !== '') compute();
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (currentOperation) {
        case 'add': result = prev + current; break;
        case 'subtract': result = prev - current; break;
        case 'multiply': result = prev * current; break;
        case 'divide': result = prev / current; break;
        default: return;
    }
    currentInput = result.toString();
    currentOperation = null;
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}

updateDisplay();
