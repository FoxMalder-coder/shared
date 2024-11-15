const createOffers = (container, data) => {
  const offers = [];

  data.forEach(item => {
    const { company, contract, logo, new: isNew, featured: isFeatured, languages, level, location, position, postedAt, role, tools } = item;

    offers.push(`
      <li class="item ${isFeatured ? 'item--featured' : ''}" data-filter=${[level, role, ...languages, ...tools].join('|')}>
        <img src=${logo} alt="${company} logo" class="logo" />
        <div class="header">
          <span class="company">${company}</span>
          ${isNew ? '<span class="sign">New!</span>' : ''}
          ${isFeatured ? '<span class="sign sign--dark">Featured</span>' : ''}
        </div>
        <h2 class="title">${position}</h2>
        <div class="info">
          <span>${postedAt}</span>
          <span>${contract}</span>
          <span>${location}</span>
        </div>

        <div class="tags">
          <button class="tag" data-role=${role}>${role}</button>
          <button class="tag" data-level=${level}>${level}</button>
          ${languages.map(item => `<button class="tag" data-languages=${item}>${item}</button>`).join('')}
          ${tools.map(item => `<button class="tag" data-tools=${item}>${item}</button>`).join('')}
        </div>
      </li>`);

  });

  container.innerHTML = offers.join('');
}

export default createOffers;