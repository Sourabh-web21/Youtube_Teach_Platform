const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://youtube-teach-platform.vercel.app',
  'https://youtube-teach-platform-awvuxrths-sourabhs-projects-f5702034.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
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
