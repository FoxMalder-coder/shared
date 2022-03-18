const slider = document.querySelector('.slider');
const before = slider.querySelector('.before');
const beforeImage = before.querySelector('img');
const change = slider.querySelector('.change');

const body = document.body;

let isActive = false;

document.addEventListener('DOMContentLoaded', () => {
  let width = slider.offsetWidth;
  beforeImage.style.width = `${width}px`;
});

const beforeAfterSlider = (x) => {
  let shift = Math.max(0, Math.min(x, slider.offsetWidth));
  before.style.width = `${shift}px`;
  change.style.left = `${shift}px`;
};

const pauseEvents = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  return false;
};

body.addEventListener('mousedown', () => {
  isActive = true;
});

body.addEventListener('mouseup', () => {
  isActive = false;
});


body.addEventListener('mouseleave', () => {
  isActive = false;
});

body.addEventListener('mousemove', (evt) => {
  if (!isActive) {
    return;
  }

  let x = evt.pageX;

  x -= slider.getBoundingClientRect().left;
  beforeAfterSlider(x);
  pauseEvents(evt);
})


body.addEventListener('touchstart', () => {
  isActive = true;
});

body.addEventListener('touchend', () => {
  isActive = false;
});


body.addEventListener('touchcancel', () => {
  isActive = false;
});

body.addEventListener('touchmove', (evt) => {
  if (!isActive) {
    return;
  }

  let x;
  let i;
  for (i = 0; i < evt.changedTouches.length; i++) {
    x = evt.changedTouches[i].pageX;
  }

  x -= slider.getBoundingClientRect().left;
  beforeAfterSlider(x);
  pauseEvents(evt);
})