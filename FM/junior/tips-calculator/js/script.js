const totalTips = document.querySelector('.total-tips');
const totalAmount = document.querySelector('.total-amount');
const bill = document.querySelector('.input--bill');
const persons = document.querySelector('.input--person');
const tips = document.querySelectorAll('.input-radio');
const customTips = document.querySelector('#r6');
const customInput = document.querySelector('.input--custom');
const resetButton = document.querySelector('.button');
const form = document.querySelector('form');

const resetEvent = () => {
  resetButton.addEventListener('click', () => {
    form.reset();
    totalTips.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
    resetButton.disabled = true;
  });
};

form.addEventListener('change', (evt) => {
  resetButton.disabled = false;
  resetEvent();
});

const deleteLastChar = (input) => {
  input.value = input.value.slice(0, -1);
}

const checkFloat = (str) => {
  const length = str.length;
  const point = str.indexOf(".");
  const comma = str.indexOf(",");
  if ((point > 0) && (length - point) > 3 || (comma > 0) && (length - comma) > 3) {
    deleteLastChar(bill);
  }
}

const isFloat = (str) => {
  return (str.includes('.') || str.includes(','));
}

const isNumber = (str) => {
  str -= 0;
  return !Number.isNaN(str);
}

const billChange = () => {
  const lastValue = bill.value.slice(0, -1);
  const lastChar = bill.value[bill.value.length - 1];
  if (isNumber(lastChar)) {
    checkFloat(bill.value);
  } else {
    if (lastChar === ',' && lastValue && !isFloat(lastValue) || lastChar === '.' && lastValue && !isFloat(lastValue)) { } else {
      deleteLastChar(bill);
    };
  };
};

bill.addEventListener('input', billChange);

persons.addEventListener('input', () => {
  const lastChar = persons.value[persons.value.length - 1];
  if (!isNumber(lastChar)) {
    deleteLastChar(persons);
  };
});

const calculate = () => {
  const n1 = parseFloat(bill.value.replace(/,/, '.'));
  const n2 = persons.value - 0;
  let n3;
  tips.forEach(tip => {
    if (tip.checked === true) { n3 = tip.value; };
  });
  if (n1 && n2 && n3) {
    totalTips.textContent = "$" + (n1 * n3 / n2).toFixed(2);
    totalAmount.textContent = "$" + ((n1 * n3 + n1) / n2).toFixed(2);
  }
  n3 = 0;
}

bill.addEventListener('change', calculate);
persons.addEventListener('change', calculate);
tips.forEach(item => item.addEventListener('change', calculate));

customInput.addEventListener('input', () => {
  const lastChar = customInput.value[customInput.value.length - 1];
  if (!isNumber(lastChar)) {
    deleteLastChar(customInput);
  };
});

customInput.addEventListener('change', () => {
  customTips.value = customInput.value / 100;
  customTips.checked = true;
});