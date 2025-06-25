const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://youtube-teach-platform-qd9j.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Serve static files
app.use('/pdfs', express.static(path.join(__dirname, 'public/pdfs')));
app.use('/pyqs', express.static(path.join(__dirname, 'public/pyqs')));

// Routes
app.use('/api/pdfs', require('./routes/pdfs'));
app.use('/api/pyqs', require('./routes/pyqs'));
app.use('/api/videos', require('./routes/youtube'));

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
