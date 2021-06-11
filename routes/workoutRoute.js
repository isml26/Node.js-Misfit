const express = require("express");
const workoutController = require('../controllers/workoutController');
const router = express.Router();

router.route('/').post(workoutController.addWorkout);
router.route('/:id').delete(workoutController.removeWorkout);
router.route('/:id').get(workoutController.getTrainerWorkouts);
router.route('/enroll').post(workoutController.enrollWorkout);

module.exports = router;