let dialed = '';
let calculation = '';
let calculated = false;

const display = document.getElementById('display');
display.value = '0';

document.getElementById('clearBtn').onclick = () => {
  clearDisplay();
}

document.getElementById('negateBtn').onclick = () => {
  negate();
}

document.getElementById('percentBtn').onclick = () => {
  percentage();
}

document.getElementById('divideBtn').onclick = () => {
  if (calculation !== '') {
    appendToDisplay('/');
    makeActive(document.getElementById('divideBtn'));
  }
}

document.getElementById('multiplyBtn').onclick = () => {
  if (calculation !== '') {
    appendToDisplay('*');
    makeActive(document.getElementById('multiplyBtn'));
  }
}

document.getElementById('subtractBtn').onclick = () => {
  if (calculation !== '') {
    appendToDisplay('-');
    makeActive(document.getElementById('subtractBtn'));
  }
}

document.getElementById('addBtn').onclick = () => {
  if (calculation !== '') {
    appendToDisplay('+');
    makeActive(document.getElementById('addBtn'));
  }
}

document.getElementById('equalsBtn').onclick = () => {
  calculate();
  removeOperationEffects();
}

document.getElementById('oneBtn').onclick = () => {
  appendToDisplay('1');
  removeOperationEffects();
}

document.getElementById('twoBtn').onclick = () => {
  appendToDisplay('2');
  removeOperationEffects();
}

document.getElementById('threeBtn').onclick = () => {
  appendToDisplay('3');
  removeOperationEffects();
}

document.getElementById('fourBtn').onclick = () => {
  appendToDisplay('4');
  removeOperationEffects();
}

document.getElementById('fiveBtn').onclick = () => {
  appendToDisplay('5');
  removeOperationEffects();
}

document.getElementById('sixBtn').onclick = () => {
  appendToDisplay('6');
  removeOperationEffects();
}

document.getElementById('sevenBtn').onclick = () => {
  appendToDisplay('7');
  removeOperationEffects();
}

document.getElementById('eightBtn').onclick = () => {
  appendToDisplay('8');
  removeOperationEffects();
}

document.getElementById('nineBtn').onclick = () => {
  appendToDisplay('9');
  removeOperationEffects();
}

document.getElementById('zeroBtn').onclick = () => {
  appendToDisplay('0');
  removeOperationEffects();
}

document.getElementById('decimalBtn').onclick = () => {
  appendToDisplay('.');
  removeOperationEffects();
}

console.log(document.querySelectorAll('.js-keys'));


// keydowns

// Feature for enter keydown to execute final calculation 
// even if a key was click previously.
/*
document.querySelectorAll('.js-keys')
.forEach((btn) => {
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      console.log(btn);
      
      calculate();
      removeOperationEffects();
    }
  });
});
*/

document.body.addEventListener('keydown', (e) => {
  if (e.key === '1') {
    appendToDisplay('1');
    removeOperationEffects();
  } else if (e.key === '2') {
    appendToDisplay('2');
    removeOperationEffects();
  } else if (e.key === '3') {
    appendToDisplay('3');
    removeOperationEffects();
  } else if (e.key === '4') {
    appendToDisplay('4');
    removeOperationEffects();
  } else if (e.key === '5') {
    appendToDisplay('5');
    removeOperationEffects();
  } else if (e.key === '6') {
    appendToDisplay('6');
    removeOperationEffects();
  } else if (e.key === '7') {
    appendToDisplay('7');
    removeOperationEffects();
  } else if (e.key === '8') {
    appendToDisplay('8');
    removeOperationEffects();
  } else if (e.key === '9') {
    appendToDisplay('9');
    removeOperationEffects();
  } else if (e.key === '0') {
    appendToDisplay('0');
    removeOperationEffects();
  } else if (e.key === '.') {
    appendToDisplay('.');
    removeOperationEffects();
  } else if (e.key === '-') {
    if (calculation !== '') {
      appendToDisplay('-');
      makeActive(document.getElementById('subtractBtn'));
    }
  } else if (e.key === '+') {
    if (calculation !== '') {
      appendToDisplay('+');
      makeActive(document.getElementById('addBtn'));
    }
  } else if (e.key === '*') {
    if (calculation !== '') {
      appendToDisplay('*');
      makeActive(document.getElementById('multiplyBtn'));
    }
  } else if (e.key === '/') {
    if (calculation !== '') {
      appendToDisplay('/');
      makeActive(document.getElementById('divideBtn'));
    }
  } else if (e.key === '%') {
    percentage();
  } else if (e.key === 'Backspace') {
    clearDisplay();
  } else if (e.key === '=') {
    calculate();
    removeOperationEffects();
  } else if (e.key === 'Enter') {
    calculate();
    removeOperationEffects();
  }
});



function appendToDisplay(input) {
  let check = Number(input);

  if (dialed === '0') {
    dialed = '';
    calculation = '';
  } else if (dialed === '-0') {
    dialed = '-';
    calculation = '-';
  }

  if (isNaN(check) && (input !== '.')) {
    dialed = '';
    let lastChar = calculation.length - 1;
    try {
      calculation = String(eval(calculation));
      display.value = calculation;
    } catch (error) {
      let calculationArr = Array.from(calculation);
      let operatorToRemove = calculationArr[lastChar];
      calculation = calculationArr.filter(value => value !== operatorToRemove).join('');
    } 
    calculation += input;
    calculated = false;
  } 
  else if (input === '.' && dialed === '') {
    dialed = '0.';
    calculation += input;
    display.value = dialed;
    calculated = false;
  } 
  else {
    if (calculated) {
      calculation = '';
    }
    dialed += input;
    display.value = dialed;
    calculation += input;
    document.getElementById('clearBtn').innerText = 'C';
    console.log(calculation);
  }

  fixFontSize();
}


function fixFontSize() {
  if ((display.value.length >= 6) && (display.value.length <= 9)) {
    display.classList.add('mid')
  } else if ((display.value.length > 9)) {
    display.classList.remove('mid')
    display.classList.add('small');
  } else if (display.value.length < 6) {
    display.classList.remove('small');
    display.classList.remove('mid');
    display.classList.add('large');
  }
}


function clearDisplay() {
  document.getElementById('clearBtn').innerText = 'AC';
  display.value = '0';
  dialed = '';
  calculation = '';
  fixFontSize();
  removeOperationEffects();
  calculated = false;
}


function calculate() {
  if (calculation !== '') {
    try {
      calculation = String(eval(calculation));
      display.value = calculation;
      dialed = '';
      calculated = true;
    } catch (error) {
      display.value = 'Error';
    }
  }

  fixFontSize();
}


function negate() {
  let number = calculation;
  
  if (number.includes('-')) {
    if (number === '') {
      number = `0`;
    } else {
      number = `${Math.abs(number)}`;
    }
  } else {
    if (number === '') {
      number = `-0`;
    } else {
      number = `-${number}`;
    }
  }

  dialed = number;
  display.value = `${dialed}`;
  calculation = number;
}


function percentage() {
  calculation/=100;
  display.value = calculation;
}


function makeActive(operator) {
  document.querySelectorAll('.js-operational-keys').forEach((operator2) => {
    if (operator2.classList.contains('active')) {
      operator2.classList.remove('active');
    }
    if (operator2.classList.contains('orange-keys') === false) {
      operator2.classList.add('orange-keys');
    }
    
  });
  operator.classList.add('active');
  operator.classList.remove('orange-keys');
}


function removeOperationEffects() {
  document.querySelectorAll('.js-operational-keys').forEach((operator2) => {
    if (operator2.classList.contains('active')) {
      operator2.classList.remove('active');
    }
    if (operator2.classList.contains('orange-keys') === false) {
      operator2.classList.add('orange-keys');
    }
  });
}