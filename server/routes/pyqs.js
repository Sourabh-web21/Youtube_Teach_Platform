const express = require('express');
const router = express.Router();
const { getPYQs } = require('../controllers/pyqcontroller');
router.get('/', getPYQs);
module.exports = router;
