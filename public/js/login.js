/*eslint-disable*/
// import axios from 'axios';
import axios from 'axios';
import { showAlert } from './alerts';
import { async } from 'regenerator-runtime';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    console.log(res.data.status);

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in succesfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.message);
  }
};