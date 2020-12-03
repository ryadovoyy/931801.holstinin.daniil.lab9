const resultElem = document.querySelector('td[colspan="5"]');
const buttons = document.querySelectorAll('button');

let operAllowed;
let dotAllowed;
let spaceRequired;

const resetState = () => {
  operAllowed = true;
  dotAllowed = true;
  spaceRequired = false;
};

const calculate = btn => {
  let input = resultElem.innerText;
  let result = '';
  const lastChar = input.slice(-1);
  const thirdCharEnd = input.slice(-3)[0];

  if (input == 'Infinity' || input == 'NaN') {
    input = '0';
  }

  switch (btn.innerText) {
    case 'C':
      resetState();
      result = '0';
      break;
    case '<-':
      if (input.length > 1) {
        if (lastChar == '.') {
          dotAllowed = true;
        }
        result = input.slice(0, -1);
      } else {
        resetState();
        result = '0';
      }
      break;
    case '=':
      if (lastChar == '.') {
        if (
          thirdCharEnd == '+' ||
          thirdCharEnd == '-' ||
          thirdCharEnd == '*' ||
          thirdCharEnd == '/'
        ) {
          input = input.slice(0, -3);
        }
        dotAllowed = true;
      } else if (
        lastChar == '+' ||
        lastChar == '-' ||
        lastChar == '*' ||
        lastChar == '/'
      ) {
        input = input.slice(0, -1);
        spaceRequired = false;
      }

      operAllowed = true;

      try {
        result = eval(input);
      } catch (e) {
        console.log('Something went wrong');
        result = '0';
      }

      if (result == '0') {
        resetState();
      }
      break;
    default:
      if (btn.className == 'num') {
        if (input == '0' && btn.innerText != '.') {
          input = '';
        }

        if (spaceRequired && (dotAllowed || btn.innerText != '.')) {
          result = input + ' ' + btn.innerText;
          spaceRequired = false;
        } else if (dotAllowed || btn.innerText != '.') {
          result = input + btn.innerText;
        } else {
          result = input;
        }

        if (btn.innerText == '.') {
          dotAllowed = false;
        } else {
          operAllowed = true;
        }
      } else {
        if (operAllowed) {
          result = input + ' ' + btn.innerText;
          operAllowed = false;
          dotAllowed = true;
          spaceRequired = true;
        } else {
          result = input;
        }
      }
  }

  resultElem.innerText = result;
};

buttons.forEach(btn => {
  btn.onclick = () => calculate(btn);
});

resetState();
