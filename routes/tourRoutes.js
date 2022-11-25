const express = require('express');
const tourController = require('../controllers/tourController');

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getToursStats,
  getMonthlyPlan,
} = tourController;

const router = express.Router(); // this is a middleware

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getToursStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;

// Middleware that runs only when routes have the 'id' param
//router.param('id', tourController.checkID); // ==== checks for id validity, handlers don't need to validate anymore
