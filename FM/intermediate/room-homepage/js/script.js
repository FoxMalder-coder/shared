const menu = document.querySelector('.menu');
const toogle = document.querySelector('.menu__toggle');
const overlay = document.querySelector('.menu__overlay');

toogle.addEventListener('click', () => menu.classList.toggle('menu--open'));
overlay.addEventListener('click', () => menu.classList.toggle('menu--open'));

const slides = document.querySelectorAll('.slide');
const prevArrow = document.querySelector('.arrow-prev');
const nextArrow = document.querySelector('.arrow-next');
let index = 0;

const setActive = () => {
  slides.forEach(item => item.classList.remove('slide--active'));
  slides[index].classList.add('slide--active');
};

const slideBack = () => {
  (index === 0) ? (index = slides.length - 1) : index--;
  setActive();
}

const slideForward = () => {
  (index === slides.length - 1) ? (index = 0) : index++;
  setActive();
};

const onScroll = (evt) => {
  if (evt.deltaY < 0) {
    slideBack();
  } else if (evt.deltaY > 0) {
    slideForward();
  };
};

const onKeydown = (evt) => {
  if (evt.key === 'ArrowLeft') {
    slideBack();
  } else if (evt.key === 'ArrowRight') {
    slideForward();
  }
}

let isActive = false;
const body = document.body;
let currentX;

const pauseEvents = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  return false;
};

body.addEventListener('dragover', (evt) => { pauseEvents(evt); });
body.addEventListener('drop', (evt) => { pauseEvents(evt); });

prevArrow.addEventListener('click', slideBack);
nextArrow.addEventListener('click', slideForward);

window.addEventListener('wheel', onScroll);
document.addEventListener('keydown', onKeydown);

body.addEventListener('mousedown', (evt) => {
  pauseEvents(evt);
  isActive = true;
  currentX = evt.pageX;
});

body.addEventListener('mousemove', () => { isActive = true; });
body.addEventListener('mouseleave', () => { isActive = false; });

body.addEventListener('mouseup', (evt) => {
  if (!isActive) {
    return;
  }

  let x = evt.pageX;
  if (x > currentX + 50) {
    slideBack();
  } else if (x < currentX - 50) {
    slideForward();
  };
  isActive = false;
  pauseEvents(evt);
});

body.addEventListener('touchstart', (evt) => {
  isActive = true;
  currentX = evt.changedTouches[0].pageX;
});

body.addEventListener('touchmove', () => { isActive = true; });
body.addEventListener('touchcancel', () => { isActive = false; });

body.addEventListener('touchend', (evt) => {
  if (!isActive) {
    return;
  }

  let x = evt.changedTouches[0].pageX;
  if (x > currentX + 20) {
    slideBack();
  } else if (x < currentX - 20) {
    slideForward();
  };
  isActive = false;
})