const ipField = document.querySelector('#ip');
const locationField = document.querySelector('#location');
const timezoneField = document.querySelector('#timezone');
const ispField = document.querySelector('#isp');
const form = document.querySelector('#form');
const input = form.querySelector('input');
const button = form.querySelector('button');

const DOMAIN_REGEXP = '^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$';
const IP_REGEXP = '([0-9]{1,3}[\.]){3}[0-9]{1,3}';

const LeafletInfo = {
  URL: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const myIcon = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

const map = L.map('map');
L.tileLayer(LeafletInfo.URL, { attribution: LeafletInfo.Attribution }).addTo(map);

const setCoordinates = ({ lat, lng }) => {
  map.setView([lat, lng], 13);
  const marker = L.marker([lat, lng], { icon: myIcon }).addTo(map);
}

const validate = (value) => {
  return !(!value.match(IP_REGEXP) && !value.match(DOMAIN_REGEXP));
}

const getInfo = async (data) => {
  const params = data === undefined ? '' : (data[0].match('[0-9]') ? `&ipAddress=${data}` : `&domain=${data}`);
  const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_IvzlAmjIlcuModJjARkXAVAeumHAY${params}`);
  return response.json();
};

const fillInfo = (res) => {
  const { ip, isp, location: { region, city, postalCode, timezone, lat, lng } } = res;
  ipField.innerHTML = ip;
  locationField.innerHTML = `${city}, ${region} ${postalCode ? postalCode : ''}`;
  timezoneField.innerHTML = `UTC ${timezone}`;
  ispField.innerHTML = isp;
  setCoordinates({ lat, lng });
};

const info = await getInfo();
fillInfo(info);


input.addEventListener('change', async (evt) => {
  evt.preventDefault();
  const isValid = validate(input.value);
  if (!isValid) {
    input.setCustomValidity('Enter valid IP-address or domain name');
  } else {
    input.setCustomValidity('');
  }
  input.reportValidity();
});

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const res = await getInfo(input.value);
  fillInfo(res);
  input.value = '';
});
