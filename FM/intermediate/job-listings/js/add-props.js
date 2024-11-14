const addProps = (offers) => {
  offers.forEach(offer => {
    const props = [];
    const tags = offer.querySelectorAll('.tag');
    tags.forEach(tag => props.push(Object.values(tag.dataset)[0]));
    offer.setAttribute('data-filter', props.join('|'));
  });
}

export default addProps;