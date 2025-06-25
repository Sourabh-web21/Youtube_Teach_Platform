import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar'; // if not added already
import '../styles/Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/videos`)
      .then(res => {
        setVideos(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error('Failed to fetch videos:', err));
  }, []);

  const handleSearch = (query) => {
    filterVideos(query, subject);
  };

  const handleSubjectChange = (e) => {
    const selected = e.target.value;
    setSubject(selected);
    filterVideos('', selected);
  };

  const filterVideos = (query, subjectFilter) => {
    let filteredList = videos;

    if (query) {
      filteredList = filteredList.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (subjectFilter) {
      filteredList = filteredList.filter(video =>
        video.title.toLowerCase().includes(subjectFilter.toLowerCase())
      );
    }

    setFiltered(filteredList);
  };

  return (
    <div className="videos-container">
      <h2>📺 Latest Videos</h2>

      <div className="video-controls">
        <SearchBar onSearch={handleSearch} />

        <select value={subject} onChange={handleSubjectChange}>
          <option value="">All Subjects</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
        </select>
      </div>

      <div className="video-grid">
        {filtered.map(video => (
          <div key={video.id} className="video-card">
            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
              <img src={video.thumbnail} alt={video.title} />
              <p>{video.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
