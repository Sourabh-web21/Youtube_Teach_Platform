import AIWidget from '../components/AIWidget';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => (
  <div className="layout-wrapper">
    <Navbar />
    <main className="layout-main">{children}</main>
    <AIWidget />
    <Footer />
  </div>
);


export default MainLayout;
