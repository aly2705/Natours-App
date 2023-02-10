/* eslint-disable */
import L from 'leaflet';

export const displayMap = (locations) => {
  const map = L.map('map', { zoomControl: false });

  L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      crossOrigin: '',
    }
  ).addTo(map);

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
