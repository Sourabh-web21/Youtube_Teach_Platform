import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
// import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Videos', path: '/videos' },
    { name: 'PDFs', path: '/pdfs' },
    { name: 'PYQs', path: '/pyqs' },
    { name: 'About', path: '/about' }
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Shubham Kharka Virtual Classroom</Link>
      <div className="nav-links">
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
          >
            {link.name}
          </Link>
        ))}
        {/* <ThemeToggle /> */}
      </div>
    </nav>
  );
};

export default Navbar;