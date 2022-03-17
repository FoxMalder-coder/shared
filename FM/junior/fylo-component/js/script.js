let progressBar = document.querySelector('.progress__bar');
let dataUsed = document.querySelector('.data__used');
let dataReserved = document.querySelector('.data__reserved');
const maxValue = 1000;

progressBar.addEventListener('change', () => {
  let usedGB = progressBar.value;
  let reservedGB = 1000 - usedGB;
  dataUsed.textContent = `${usedGB} MB`;
  dataReserved.textContent = reservedGB;
})
