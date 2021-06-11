const express = require("express");
const pageController = require('../controllers/pageController');
const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/trainer').get(pageController.getTrainerPage);
router.route('/gallery').get(pageController.getGalleryPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEmail);
router.route('/login').get(pageController.getLoginPage);
router.route('/register').get(pageController.getRegisterPage);


module.exports = router;