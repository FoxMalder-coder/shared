import updateFilterPanel from './filter-panel.js';
import createOffers from './create-offers.js';

const list = document.querySelector('.list');

const data = await fetch('data.json')
  .then((response) => response.json());

createOffers(list, data);

const offers = list.querySelectorAll('li');
const clearAllButton = document.querySelector('.clear-all-filter');

const clearAllFilters = () =>
  offers.forEach(offer => offer.hidden = false);

const applyFilter = (filter) => {
  for (const offer of offers) {
    if (!offer.dataset.filter.includes(filter)) {
      offer.hidden = true;
    }
  }
}

const updateFilters = (filters) => {
  for (const offer of offers) {
    offer.hidden = !filters.every(filter =>
      offer.dataset.filter.includes(filter));
  }
};

clearAllButton.addEventListener('click', () => {
  clearAllFilters();
  updateFilterPanel();
});

document.addEventListener('click', (evt) => {
  const elem = evt.target;

  if (elem.className === 'tag') {
    const dataValuesArray = [];
    for (const item in elem.dataset) {
      dataValuesArray.push(elem.dataset[item]);
    };

    const newFilter = dataValuesArray[0];
    applyFilter(newFilter);
    updateFilterPanel(newFilter);
  }

  if (elem.className === 'filter-reset-img') {
    const removedFilter = elem.closest('.filter-item').id;
    const filters = updateFilterPanel(removedFilter, true);

    !filters.length ? clearAllFilters() : updateFilters(filters);
  }
});