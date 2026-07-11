let currentNum = '';
let prevNum = '';
let operator = null;

const screen = document.querySelector('.header p:nth-child(3)');
const button = document.querySelectorAll('.inner button');

button.forEach(function(item) {
    item.addEventListener('click', function(event) {
        console.log(event.target.textContent);
        const clickedValue = event.target.textContent;
        if (clickedValue !== 'RESET' && clickedValue !== 'DEL' && clickedValue !== '=' && clickedValue !== '+' && clickedValue !== '-' && clickedValue !== '/' && clickedValue !== 'x') {
            if (clickedValue === '.' && currentNum.includes('.')) {
                return;
            }
            currentNum += clickedValue;
            updateDisplay();
        }
        else if(clickedValue === 'RESET') {
            currentNum = '';
            prevNum = '';
            operator = null;
            updateDisplay();
        }
        else if(clickedValue === 'DEL') {
            currentNum = currentNum.slice(0, -1);
            updateDisplay();
        }
        else if(clickedValue === '+' || clickedValue === '-' || clickedValue === 'x' || clickedValue === '/') {
            if (currentNum === '') return;
            
            if (prevNum !== '') {
                calculate();
            }
            operator = clickedValue;
            prevNum = currentNum;
            currentNum = '';
            updateDisplay();
        }
        else if (clickedValue === '=') {
            if (!operator || currentNum === '') return;
            calculate();
            updateDisplay();
        }
    });
});


function updateDisplay() {
    if (currentNum) {
        screen.textContent = currentNum;
    } else if (prevNum) {
        screen.textContent = prevNum; 
    } else {
        screen.textContent = '0'; 
    }
}

function calculate() {
    const num1 = parseFloat(prevNum);
    const num2 = parseFloat(currentNum);

    let result = 0;

    if(operator === '+'){
        result = num1 + num2;
    }
    else if(operator === '-'){
        result = num1 - num2;
    }
    else if(operator === 'x'){
        result = num1 * num2;
    }
    else if(operator === '/'){
        if (num2 === 0) {
            currentNum = 'Error';
            operator = null;
            prevNum = '';
            return;
        }
        result = num1 / num2;
    }

    currentNum = result.toString();
    operator= null;
    prevNum = '';
}

let currentTheme = 1;
const toggleContainer = document.querySelector('.toggle');

toggleContainer.addEventListener('click', function() {
    if (currentTheme === 1) {
        currentTheme = 2;
    } else if (currentTheme === 2) {
        currentTheme = 3;
    } else {
        currentTheme = 1;
    }

    // Swaps the attribute on the body tag
    document.body.setAttribute('data-theme', currentTheme);
});