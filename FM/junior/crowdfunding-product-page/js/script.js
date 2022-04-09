// Mobile menu
const nav = document.querySelector('.navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');
const body = document.querySelector('body');

navToggle.addEventListener('click', () => {
  const visibility = nav.getAttribute('data-visible');
  const overlay = nav.parentNode.querySelector('.overlay');

  const hideMenu = () => {
    body.style.overflow = 'auto';
    nav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
    overlay.style.display = 'none';
  }

  if (visibility === 'false') {
    body.style.overflow = 'hidden';
    nav.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);
    overlay.style.display = 'block';
    overlay.addEventListener('click', hideMenu);
  } else {
    hideMenu();
  }
});

// Bookmark
const markBtn = document.querySelector('.button-bookmark');
markBtn.addEventListener('click', () => {
  const isMarked = markBtn.getAttribute('data-mark');
  if (isMarked === 'false') {
    markBtn.textContent = 'Bookmarked';
    markBtn.setAttribute('data-mark', true);
  } else {
    markBtn.textContent = 'Bookmark';
    markBtn.setAttribute('data-mark', false);
  }
});


// Modal form
const form = document.querySelector('.form');
const formOverlay = form.querySelector('.overlay');
const formContent = document.querySelector('.form form');
const formCloseBtn = document.querySelector('.form-close-button');
const buttons = document.querySelectorAll('.button[aria-controls="reward-form"]');
const radioBtns = document.querySelectorAll('input[type="radio"]');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    window.scrollTo(0, 0);
    form.setAttribute('data-visible', true);
  })
})

const hideForm = () => {
  radioBtns.forEach(btn => btn.parentNode.classList.remove('form-card--checked'));
  formContent.reset();
  form.setAttribute('data-visible', false);
};

formCloseBtn.addEventListener('click', hideForm);
formOverlay.addEventListener('click', hideForm);

radioBtns.forEach(btn => {
  btn.addEventListener('change', (e) => {
    radioBtns.forEach(btn => btn.parentNode.classList.remove('form-card--checked'));
    e.target.parentNode.classList.add('form-card--checked');
  });
})

// Success popup
const submitBtns = document.querySelectorAll('.form-card .button');
const popup = document.querySelector('.popup');
const popupOverlay = popup.querySelector('.overlay');
const popupBtn = document.querySelector('.popup .button');

submitBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    hideForm();
    body.style.overflow = 'hidden';
    popup.style.display = 'flex';

    const hidePopup = () => {
      body.style.overflow = 'auto';
      popup.style.display = 'none';
    };

    popupBtn.addEventListener('click', hidePopup);
    popupOverlay.addEventListener('click', hidePopup);
  });
});