import { useEffect, useState } from 'react';
import '../styles/PYQs.css';

const PYQs = () => {
  const [pyqs, setPyqs] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    const origin = window.location.origin; // http://localhost:3000
    setBaseUrl(origin.includes('localhost') ? 'http://localhost:5000' : origin);

    fetch('/api/pyqs')
      .then(res => res.json())
      .then(setPyqs)
      .catch(console.error);
  }, []);

  return (
    <div className="pyq-container">
      <h2>📄 Previous Year Questions (PYQs)</h2>
      <div className="pyq-grid">
        {pyqs.map((pyq, i) => (
          <div className="pyq-card" key={i}>
            <div className="pyq-preview">
              <embed
                src={`${baseUrl}${pyq.link}#page=1&zoom=50`}
                type="application/pdf"
                className="blurred-preview"
              />
            </div>
            <h3>{pyq.title}</h3>
            <a
              href={`${baseUrl}${pyq.link}`}
              target="_blank"
              rel="noreferrer"
            >
              📥 Open
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PYQs;
