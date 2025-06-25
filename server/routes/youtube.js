const express = require('express');
const router = express.Router();
const { getVideos } = require('../controllers/youtubeController');

router.get('/', getVideos);

module.exports = router;
