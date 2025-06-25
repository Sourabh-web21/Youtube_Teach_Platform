import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import About from './pages/AboutPage';
import Home from './pages/Home';
import PDFs from './pages/PDFs';
import PYQs from './pages/PYQs';
import Videos from './pages/Videos';

const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/pdfs" element={<PDFs />} />
      <Route path="/pyqs" element={<PYQs />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </MainLayout>
);

export default App;
