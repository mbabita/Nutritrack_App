import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const handleLinkClick = (e, path, section) => {
    e.preventDefault();
    if (setActiveSection) {
      setActiveSection(section);
    } else {
      navigate(path);
    }
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-section">
          <h3>NutriTrack</h3>

            <p>NutriTrack is your partner in achieving optimal health through personalized nutrition tracking and meal planning.</p>
          </div>
          <div className="footer-section">
            <h3>Policy and Privacy</h3>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/" onClick={(e) => handleLinkClick(e, '/', 'Dashboard')}>Home</a></li>
              <li><a href="/dashboard" onClick={(e) => handleLinkClick(e, '/dashboard', 'Dashboard')}>Dashboard</a></li>
              <li><a href="/tracking" onClick={(e) => handleLinkClick(e, '/tracking', 'Tracking')}>Tracking</a></li>
              <li><a href="/recipes" onClick={(e) => handleLinkClick(e, '/recipes', 'Recipes')}>Recipes</a></li>
              <li><a href="/meal-kits" onClick={(e) => handleLinkClick(e, '/meal-kits', 'Meal Kits')}>Meal Kits</a></li>
            </ul>
            <p>Phone: +91 9380226207 | Email: info@nutritrack.com | Address: 123 Health St, Wellness City, Bangalore</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 NutriTrack. All rights reserved.</p>
          <div className="social-links">
            <a href="#facebook" className="social-link">Facebook</a>
            <a href="#twitter" className="social-link">Twitter</a>
            <a href="#instagram" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
