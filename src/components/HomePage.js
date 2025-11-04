import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleExploreFeatures = (section) => {
    navigate('/dashboard');
    // Note: In a real app, you might pass a state or use a global state to set activeSection
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Navigation */}
      <motion.nav
        className={styles.navbar}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className={styles.navContent}>
          <motion.h2
            className={styles.logo}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.3 }}
          >
            <FaRocket style={{ marginRight: '8px' }} />
            NutriTrack
          </motion.h2>
          <div className={styles.navLinks}>
            <motion.button
              className={styles.navButton}
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '14px', padding: '6px 12px', marginRight: '8px' }}
            >
              Home
            </motion.button>
            <motion.button
              className={styles.navButton}
              onClick={() => navigate('/features')}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '14px', padding: '6px 12px', marginRight: '8px' }}
            >
              Features
            </motion.button>
            <motion.button
              className={styles.navButton}
              onClick={() => navigate('/plans')}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '14px', padding: '6px 12px', marginRight: '8px' }}
            >
              Plans
            </motion.button>
            <motion.button
              className={styles.navButton}
              onClick={() => navigate('/testimonials')}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '14px', padding: '6px 12px', marginRight: '8px' }}
            >
              Testimonials
            </motion.button>
            <motion.button
              className={styles.navButton}
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '14px', padding: '6px 12px', marginRight: '8px' }}
            >
              Contact
            </motion.button>
            <motion.button
              className={styles.navButton}
              onClick={() => navigate('/profile')}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '14px', padding: '6px 12px' }}
            >
              Profile
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        variants={itemVariants}
      >
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            variants={itemVariants}
          >
            Welcome to Your <span className={styles.highlight}>Nutrition Journey</span>
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            variants={itemVariants}
          >
            Discover personalized nutrition tracking, meal plans, and a supportive community to help you achieve your health goals.
          </motion.p>
          <motion.button
            className={styles.ctaButton}
            onClick={handleGetStarted}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className={styles.about}
        variants={itemVariants}
      >
        <motion.h2
          className={styles.sectionTitle}
          variants={itemVariants}
        >
          About
        </motion.h2>
        <motion.div
          className={styles.aboutGrid}
          variants={containerVariants}
        >
          <motion.div
            className={styles.aboutItem}
            variants={itemVariants}
          >
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop"
              alt="Healthy nutrition"
            />
            <h3>Nutrition</h3>
            <p>Nutrition is the cornerstone of good health. Our platform helps you understand the vital role that balanced nutrition plays in maintaining energy levels, supporting immune function, and achieving optimal wellness.</p>
          </motion.div>
          <motion.div
            className={styles.aboutItem}
            variants={itemVariants}
          >
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
              alt="Personalized diet plans"
            />
            <h3>Personalized Diet Plans</h3>
            <p>Every individual is unique. Our system creates custom diet plans based on your specific goals, lifestyle, preferences, and nutritional requirements for sustainable, long-term success.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className={styles.whyChoose}
        variants={itemVariants}
      >
        <motion.h2
          className={styles.sectionTitle}
          variants={itemVariants}
        >
          Why Choose NutriTrack?
        </motion.h2>
        <motion.div
          className={styles.featuresGrid}
          variants={containerVariants}
        >
          <motion.div
            className={styles.featureItem}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.featureIcon}>🤖</div>
            <h3>Insights</h3>
            <p>Get intelligent recommendations based on your eating patterns and health data.</p>
          </motion.div>
          <motion.div
            className={styles.featureItem}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.featureIcon}>📊</div>
            <h3>Advanced Analytics</h3>
            <p>Visualize your progress with detailed charts and comprehensive health reports.</p>
          </motion.div>
          <motion.div
            className={styles.featureItem}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.featureIcon}>🏆</div>
            <h3>Achievement System</h3>
            <p>Earn badges and rewards as you reach milestones in your health journey.</p>
          </motion.div>
          <motion.div
            className={styles.featureItem}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.featureIcon}>🔒</div>
            <h3>Privacy First</h3>
            <p>Your health data is encrypted and never shared without your explicit consent.</p>
          </motion.div>
          <motion.div
            className={styles.featureItem}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.featureIcon}>🌍</div>
            <h3>Global Community</h3>
            <p>Join users worldwide sharing tips, recipes, and success stories.</p>
          </motion.div>
          <motion.div
            className={styles.featureItem}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.featureIcon}>⚡</div>
            <h3>Real-time Sync</h3>
            <p>Access your data across all devices with seamless synchronization.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className={styles.cta}
        variants={itemVariants}
      >
        <motion.h2
          variants={itemVariants}
        >
          Ready to Transform Your Health?
        </motion.h2>
        <motion.p
          variants={itemVariants}
        >
          Join thousands of users who have already started their nutrition journey with NutriTrack.
        </motion.p>
        <motion.button
          className={styles.ctaButtonSecondary}
          onClick={handleGetStarted}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go to Dashboard
        </motion.button>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;
