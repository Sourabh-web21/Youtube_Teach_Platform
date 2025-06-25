const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

const getVideos = async (req, res) => {
  try {
    // Step 1: Get latest videos from the channel
    const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: API_KEY,
        channelId: CHANNEL_ID,
        part: 'snippet',
        maxResults: 50,
        order: 'date',
        type: 'video' // only actual videos, excludes channels/playlists
      }
    });

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

    // Step 2: Get video details (duration, etc.)
    const detailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        key: API_KEY,
        part: 'contentDetails,snippet',
        id: videoIds
      }
    });

    // Step 3: Filter out videos shorter than 60 seconds (Shorts)
    const videos = detailsResponse.data.items
      .filter(video => {
        const duration = video.contentDetails.duration;
        const match = duration.match(/PT(\d+)M(\d+)?S?/); // e.g. PT2M30S
        const minutes = match ? parseInt(match[1]) : 0;
        const seconds = match && match[2] ? parseInt(match[2]) : 0;
        const totalSeconds = minutes * 60 + seconds;
        return totalSeconds >= 60;
      })
      .map(video => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url
      }));

    res.json(videos);
  } catch (error) {
    console.error('YouTube API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
};

module.exports = { getVideos };
