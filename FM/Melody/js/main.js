const floors = document.querySelectorAll('.image path');
const counter = document.querySelector('.counter-level');
const counterUp = document.querySelector('.counter-btn-up');
const counterDown = document.querySelector('.counter-btn-down');
const modal = document.querySelector('.modal');
const modalFloor = document.querySelector('.floor-number');
const modalOpenBtn = document.querySelector('.modal-open-btn');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const flats = document.querySelectorAll('.flat-number');
const flatsImages = document.querySelectorAll('.floor path');
let currentFloor;
let currentFlat;

const modalToggle = () => {
  modal.classList.toggle('is-open');
};

const changeAttribute = (arr, attr, number) => {
  arr.forEach((item) => {
    let dataAttribute = item.getAttribute(`data-${attr}`);
    if (dataAttribute == number) {
      item.classList.add(`current-${attr}`);
    } else {
      item.classList.remove(`current-${attr}`);
    }
  });
};

changeAttribute(floors, 'floor', counter.textContent);

const addFlatListListener = () => {
  for (flat of flats) {
    let currentFloor = Number(modalFloor.textContent);
    let index = [...flats].indexOf(flat) + 1;
    let currentFlatNumber;

    if (currentFloor < 10) {
      currentFlatNumber = currentFloor * 10 + index;
    } else {
      currentFlatNumber = currentFloor * 100 + index;
    }

    flat.textContent = currentFlatNumber;

    flat.parentNode.addEventListener('mouseover', () => {
      changeAttribute(flatsImages, 'flat', index);
    });

    flat.parentNode.addEventListener('mouseout', () => {
      changeAttribute(flatsImages, 'flat', 0);
    });
  };
};

const addFlatImagesListener = () => {
  for (path of flatsImages) {
    let currentFlat = path.getAttribute('data-flat');

    path.addEventListener('mouseover', () => {
      changeAttribute(flatsImages, 'flat', currentFlat);
      flats[currentFlat - 1].parentNode.classList.add('flat-link-current');
    });

    path.addEventListener('mouseout', () => {
      changeAttribute(flatsImages, 'flat', 0);
      flats[currentFlat - 1].parentNode.classList.remove('flat-link-current');
    });
  };
};

const modalCallback = () => {
  modalToggle();
  modalFloor.textContent = counter.textContent;
  addFlatListListener();
  addFlatImagesListener();
};

modalCloseBtn.addEventListener('click', () => {
  modalToggle();
  modalCloseBtn.removeEventListener('click', modalCallback);
});

modalOpenBtn.addEventListener('click', modalCallback);

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    modalToggle();
    modalCloseBtn.removeEventListener('click', modalCallback);
  };
});

floors.forEach((item) => {
  item.addEventListener('mouseover', () => {
    currentFloor = item.getAttribute('data-floor');
    counter.textContent = currentFloor;
    changeAttribute(floors, 'floor', currentFloor);
  });

  item.addEventListener('click', modalCallback);
})

counterUp.addEventListener('click', () => {
  currentFloor = counter.textContent;
  if (Number(currentFloor) < 18) {
    currentFloor++;
    counter.textContent = String(currentFloor).padStart(2, '0');
    changeAttribute(floors, 'floor', currentFloor);
  }
});

counterDown.addEventListener('click', () => {
  currentFloor = counter.textContent;
  if (Number(currentFloor) > 2) {
    currentFloor--;
    counter.textContent = String(currentFloor).padStart(2, '0');
    changeAttribute(floors, 'floor', currentFloor);
  }
});