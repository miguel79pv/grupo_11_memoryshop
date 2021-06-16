const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

router.get('/flash', brandController.flash);
router.get('/ssd', brandController.ssd);
router.get('/ram', brandController.ram);

module.exports = router;

