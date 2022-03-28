const menu = document.querySelector('.menu');
const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', () => menu.classList.toggle('menu--open'));

const questionCurrent = document.querySelector('.calc__count');
const questionAll = document.querySelector('.calc__count-all');
const bar = document.querySelector('.progress__current');
const question = document.querySelector('.question');
const answer1 = document.querySelector('.answer1');
const image1 = document.querySelector('.image1');
const radio1 = document.querySelector('.radio1');
const answer2 = document.querySelector('.answer2');
const image2 = document.querySelector('.image2');
const radio2 = document.querySelector('.radio2');
const nextBtn = document.querySelector('.form__next');
const skipBtn = document.querySelector('.form__skip');

let count = 0;
const database = [];

const countChek = () => {
  const amount = database.length;
  if (count < amount - 1) {
    count++;
    return true;
  } else {
    return false;
  };
};

const refreshProgress = () => {
  const amount = database.length;
  questionCurrent.value = amount - count - 1;
  questionAll.value = amount;
  bar.style.width = `${((count + 1) / amount * 100)}%`;
}

const refreshField = () => {
  question.textContent = database[count].question;
  answer1.textContent = database[count].answer1;
  answer2.textContent = database[count].answer2;
  image1.src = database[count].image1;
  image2.src = database[count].image2;
  radio1.checked = false;
  radio1.name = database[count].name;
  radio1.value = database[count].value1;
  radio2.checked = false;
  radio2.name = database[count].name;
  radio2.value = database[count].value2;
}

const makeNext = () => {
  refreshProgress();
  refreshField();
};

const createData = (array) => {
  array.forEach((elem, index) => database[index] = elem);
};

const init = () => {
  fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    createData(data);
    makeNext();
  })
  .catch((error) => {
    console.log(`New error - ${error}`)
  });
}

init();

nextBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (countChek()) { makeNext() };
});

skipBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (countChek()) { makeNext() };
});
