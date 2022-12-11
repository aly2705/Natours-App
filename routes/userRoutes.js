const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { getAllUsers, getUser, updateUser, deleteUser } = userController;

const router = express.Router();

//Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

//Will protect all of the routes from now on
router.use(authController.protect);
router.get(
  '/me',

  userController.getMe,
  userController.getUser
);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

//Will restrict all of the routes from now on
router.use(authController.restrictTo('admin'));
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
