const panel = document.querySelector('.filter');
const template = document.querySelector('#btn').content;
let filters = [];

const renderFilterItem = (data) => {
  const elem = template.cloneNode(true);
  elem.querySelector('button').setAttribute('id', data);
  elem.querySelector('span').textContent = data;
  panel.appendChild(elem);
}

const clearFilterPanel = () => {
  const items = panel.querySelectorAll('.filter-item');
  items?.forEach(item => panel.removeChild(item));
  filters = [];
  panel.hidden = true;
}

const updateFilterPanel = (data, remove = false) => {
  if (remove) {
    const items = panel.querySelectorAll('.filter-item');
    items.forEach(item => {
      if (item.id === data) {
        panel.removeChild(item);
      }
    });

    filters = filters.filter(filter => filter !== data);
    if (!filters.length) { panel.hidden = true }

    return filters;
  }

  if (filters.includes(data)) {
    return;
  }

  if (!data) { clearFilterPanel() }
  else {
    panel.hidden = false;
    renderFilterItem(data);
    filters.push(data);
  }
};

export default updateFilterPanel;