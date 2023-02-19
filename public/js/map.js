/* eslint-disable */
import L from 'leaflet';

export const displayMap = (locations) => {
  const map = L.map('map', { zoomControl: false });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    crossOrigin: '',
  }).addTo(map);

  let points = [];
  locations.forEach((location) => {
    points.push([location.coordinates.at(1), location.coordinates.at(0)]);
    L.marker([location.coordinates.at(1), location.coordinates.at(0)])
      .addTo(map)
      .bindPopup(`<p>Day ${location.day}: ${location.description}</p>`, {
        autoClose: false,
      })
      .openPopup();
  });

  const bounds = L.latLngBounds(points).pad(0.5);
  map.fitBounds(bounds);
};
