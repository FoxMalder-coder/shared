const menu = document.querySelector('.menu');
const menuToggle = document.querySelector('.menu__toggle');
const menuOverlay = document.querySelector('.menu__overlay');

menuToggle.addEventListener('click', () => menu.classList.toggle('menu--open'));
menuOverlay.addEventListener('click', () => menu.classList.toggle('menu--open'));

const slider = new Swiper('.gallery', {
  loop: true,

  navigation: {
    nextEl: '.gallery__button-next',
    prevEl: '.gallery__button-prev',
  },

  thumbs: {
    swiper: {
      el: '.thumbs',
      spaceBetween: 28,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    },
  },
});

const countValue = document.querySelector('.count__value');
const countMinus = document.querySelector('.count__decrease');
const countPlus = document.querySelector('.count__increase');
const count = document.querySelector('.count');

count.addEventListener('click', (evt) => {
  let counter = Number(countValue.textContent);
  if (evt.target === countMinus && counter >= 1) {
    counter--;
  } else if (evt.target === countPlus) {
    counter++;
  }
  countValue.textContent = counter;
});

const gallery = document.querySelector('.gallery');
const thumbs = document.querySelector('.thumbs');
const lightbox = document.querySelector('.modal-gallery');
const lightboxContent = document.querySelector('.modal-gallery__content');
const lightboxCloseButton = document.querySelector('.modal-gallery__close');

const lightboxCreate = () => {
  lightbox.hidden = false;

  const newGallery = gallery.cloneNode(true);
  const prevArrow = newGallery.querySelector('.arrow--prev');
  const nextArrow = newGallery.querySelector('.arrow--next');
  prevArrow.style.display = 'block';
  nextArrow.style.display = 'block';
  const newThumbs = thumbs.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(newGallery);
  fragment.appendChild(prevArrow);
  fragment.appendChild(nextArrow);
  fragment.appendChild(newThumbs);
  lightboxContent.appendChild(fragment);

  const lightboxSlider = new Swiper('.modal-gallery .gallery', {
    loop: true,

    navigation: {
      nextEl: '.modal-gallery .gallery__button-next',
      prevEl: '.modal-gallery .gallery__button-prev',
    },

    thumbs: {
      swiper: {
        el: '.modal-gallery .thumbs',
        spaceBetween: 28,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      },
    },
  });
  document.addEventListener('keydown', onEscPressed);
};

const onEscPressed = (evt) => {
  if (evt.key === ('Escape' || 'Esc')) { lightboxClose(); }
};

const lightboxClose = () => {
  lightbox.hidden = true;
  while (lightboxContent.childNodes.length > 2) {
    lightboxContent.lastChild.remove();
  };
  document.removeEventListener('keydown', onEscPressed);
};

if (window.innerWidth >= 768) {
  gallery.addEventListener('click', lightboxCreate);
  lightboxCloseButton.addEventListener('click', lightboxClose);
};

const cartCount = document.querySelector('.cart__count');
const cartCheck = () => {
  Number(cartCount.textContent) ? cartCount.classList.add('cart__count--nonzero') : cartCount.classList.remove('cart__count--nonzero');
}

const cartIcon = document.querySelector('.cart__icon');
const cartEmpty = document.querySelector('.cart__empty');
const cartWrapper = document.querySelector('.cart__wrapper');

cartIcon.addEventListener('click', () => cartWrapper.classList.toggle('cart__wrapper--open'));

const basket = document.querySelector('#basket');
const productInfo = basket.content.querySelector('.good');
const btn = basket.content.querySelector('.button');

const item = document.querySelector('.cart-title').textContent;
const image = document.querySelector('.cart-thumb').src;
const price = document.querySelector('.price__current');

const onAddButtonClick = () => {
  const value = Number(countValue.textContent);
  if (value) {
    cartCount.textContent = value;
    cartCheck();

    while (cartWrapper.childNodes.length > 4) {
      cartWrapper.lastChild.remove();
    };
    cartEmpty.hidden = true;

    const content = document.createElement('div');
    content.classList.add('cart__content');
    const newProduct = productInfo.cloneNode(true);
    const newBtn = btn.cloneNode(true);
    newProduct.childNodes[3].textContent = item;
    newProduct.childNodes[1].src = image;

    const x = newProduct.querySelector('.good__price');
    const y = newProduct.querySelector('.good__quantity');
    const z = newProduct.querySelector('.good__total');
    let temp = price.textContent.slice(1);
    temp *= value;
    x.textContent = price.textContent;
    y.textContent = value;
    z.textContent = `$${temp}.00`;

    const dellButton = newProduct.querySelector('.good__trash');
    dellButton.addEventListener('click', () => {
      dellButton.parentNode.remove();
      cartCount.textContent = 0;
      cartCheck();
      cartWrapper.lastChild.remove();
      cartEmpty.hidden = false;
    });

    content.appendChild(newProduct);
    content.appendChild(newBtn);
    cartWrapper.appendChild(content);

    countValue.textContent = 0;
  };
};

const addButton = document.querySelector('.cart-button');
addButton.addEventListener('click', onAddButtonClick);

