import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplineScene from '../components/SplineScene';
import '../styles/Home.css';

const Home = () => {
  const features = [
    {
      title: 'Video Lectures',
      description: 'Comprehensive video content for every topic with in-depth explanations.',
      icon: '🎥',
      link: '/videos',
      color: 'bg-blue'
    },
    {
      title: 'NCERT PDFs',
      description: 'Instant access to official NCERT books, organized by chapter.',
      icon: '📘',
      link: '/pdfs',
      color: 'bg-green'
    },
    {
      title: 'Previous Year Questions',
      description: 'Practice real exam questions to boost your preparation.',
      icon: '🗂️',
      link: '/pyqs',
      color: 'bg-yellow'
    },
    {
      title: 'Expert Teachers',
      description: 'Qualified and passionate educators guiding your journey.',
      icon: '👩‍🏫',
      link: '/about',
      color: 'bg-red'
    }
  ];

  const stats = [
    { label: 'Students Taught', value: '10,000+' },
    { label: 'Video Lectures', value: '500+' },
    { label: 'Study Materials', value: '1,000+' },
    { label: 'Success Rate', value: '95%' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>
                Learn with the Best <span>Educational Platform</span>
              </h1>
              <p>
                Unlock academic excellence through curated video lectures, expert guidance, and official materials.
              </p>
              <div className="hero-buttons">
                <Link to="/videos" className="primary">
                  Start Learning
                </Link>
                <Link to="/about" className="secondary">
                  Meet Our Teachers
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-spline"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SplineScene />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="value">{stat.value}</div>
            <div className="label">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Everything You Need to Excel</h2>
          <p>
            Your go-to portal for academic resources, expert help, and consistent progress.
          </p>
        </motion.div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={feature.link} className="feature-card">
                <div className={`feature-icon ${feature.color}`}>
                  {feature.icon}
                </div>
                <div className="feature-title">{feature.title}</div>
                <div className="feature-desc">{feature.description}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Your Learning Journey?</h2>
          <p>Join thousands of students who trust our platform for success.</p>
          <Link to="/videos">Browse Videos Now</Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
