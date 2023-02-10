/* eslint-disable */
import '@babel/polyfill';
import { login } from './login.js';
import { displayMap } from './map.js';

// DOM ELEMENTS
const form = document.querySelector('.form');
const map = document.querySelector('#map');

// DELEGATION
if (map) {
  let { locations } = document.querySelector('#map').dataset;
  locations = JSON.parse(locations);
  displayMap(locations);
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
