/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login.js';
import { displayMap } from './map.js';
import { updateSettings } from './updateSettings.js';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const map = document.querySelector('#map');
const logoutBtn = document.querySelector('.nav__el--logout');
const accSettingsForm = document.querySelector('.form-user-data');
const updatePasswordFrom = document.querySelector('.form-password');

// DELEGATION
if (map) {
  let { locations } = document.querySelector('#map').dataset;
  locations = JSON.parse(locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (accSettingsForm) {
  accSettingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (updatePasswordFrom) {
  updatePasswordFrom.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const oldPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const newPasswordConfirm =
      document.getElementById('password-confirm').value;
    await updateSettings(
      { oldPassword, newPassword, newPasswordConfirm },
      'password'
    );

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--save-password').textContent = 'Save Password';
  });
}
