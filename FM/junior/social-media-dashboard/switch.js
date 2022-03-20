const toggle = document.querySelector('.theme');
const html = document.querySelector('html');

toggle.addEventListener('click', () => html.classList.toggle('dark'));