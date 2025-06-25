const express = require('express');
const router = express.Router();
const { getPDFs } = require('../controllers/pdfcontroller');

router.get('/', getPDFs);

module.exports = router;
