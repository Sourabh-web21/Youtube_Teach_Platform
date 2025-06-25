import axios from 'axios';
import { useState } from 'react';

export const useYouTube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/videos');
      setVideos(data);
    } catch (err) {
      console.error('Error fetching videos', err);
    } finally {
      setLoading(false);
    }
  };

  return { videos, loading, fetchVideos };
};