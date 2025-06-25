const fs = require('fs');
const path = require('path');

const getPYQs = (req, res) => {
  const pyqFolder = path.join(__dirname, '../public/pyqs');

  fs.readdir(pyqFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read PYQ folder' });
    }

    const pyqs = files.map(file => ({
      title: file.replace(/[-_]/g, ' ').replace('.pdf', ''),
      link: `/pyqs/${file}`
    }));

    res.json(pyqs);
  });
};

module.exports = { getPYQs };
