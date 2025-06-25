const fs = require('fs');
const path = require('path');

// Updated getPDFs with book number filter support
const getPDFs = async (req, res) => {
  const selectedClass = req.query.class;
  const subject = req.query.subject?.toLowerCase();
  const bookNumber = req.query.book || '1'; // default to book 1 if not specified

  const chapterMap = {
    '11': {
      mathematics: { code: 'lemh', chapters: [9, 7] },
      physics: { code: 'keph', chapters: [8, 7] },
      chemistry: { code: 'kemh', chapters: [9, 5] }
    },
    '12': {
      mathematics: { code: 'lemh', chapters: [6, 7] },
      physics: { code: 'keph', chapters: [8, 7] },
      chemistry: { code: 'kemh', chapters: [9, 7] }
    }
  };

  const subjectInfo = chapterMap[selectedClass]?.[subject];
  const partIndex = parseInt(bookNumber) - 1;

  if (!subjectInfo || isNaN(partIndex) || partIndex > 1) {
    return res.status(400).json({ error: 'Invalid class, subject, or book number' });
  }

  const baseURL = 'https://ncert.nic.in/textbook/pdf/';
  const code = subjectInfo.code + (bookNumber || '1');
  const totalChapters = subjectInfo.chapters[partIndex];

  const pdfs = [];
  for (let i = 1; i <= totalChapters; i++) {
    const chapterNum = i.toString().padStart(2, '0');
    pdfs.push({
      title: `Chapter ${i}`,
      link: `${baseURL}${code}${chapterNum}.pdf`
    });
  }

  res.json(pdfs);
};

module.exports = { getPDFs };



