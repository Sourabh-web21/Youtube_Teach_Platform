import { useEffect, useState } from 'react';
import '../styles/PDFs.css';

const chapterMap = {
  '11': {
    mathematics: { books: 1 },
    physics: { books: 2 },
    chemistry: { books: 2 },
  },
  '12': {
    mathematics: { books: 2 },
    physics: { books: 2 },
    chemistry: { books: 2 },
  }
};

const PDFs = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [filteredPDFs, setFilteredPDFs] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!selectedClass || !selectedSubject || !selectedBook) {
      setFilteredPDFs([]);
      return;
    }

    fetch(`${baseUrl}/api/pdfs?class=${selectedClass}&subject=${selectedSubject}&book=${selectedBook}`)
      .then(res => res.json())
      .then(setFilteredPDFs)
      .catch(console.error);
  }, [selectedClass, selectedSubject, selectedBook, baseUrl]);

  const showBook2 = chapterMap[selectedClass]?.[selectedSubject]?.books === 2;

  return (
    <div className="pdfs-container">
      <h2>📘 NCERT Books</h2>

      <div className="filters">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>

        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">Select Subject</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
        </select>

        {selectedClass && selectedSubject && (
          <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
            <option value="">Select Book</option>
            <option value="1">Book 1</option>
            {showBook2 && <option value="2">Book 2</option>}
          </select>
        )}
      </div>

      <div className="pdf-list">
        {filteredPDFs.length === 0 ? (
          <p className="text-muted">No PDFs available for this selection.</p>
        ) : (
          filteredPDFs.map((pdf, index) => {
            const pdfUrl = pdf.link.startsWith('http') ? pdf.link : `${baseUrl}${pdf.link}`;
            return (
              <div className="pdf-card" key={index}>
                <h3>{pdf.title}</h3>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">📥 Open</a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PDFs;
