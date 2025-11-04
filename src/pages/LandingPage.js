import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaPlay, FaStar, FaUsers, FaChartLine, FaAppleAlt, FaHeartbeat, FaRocket, FaShieldAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import PaymentModal from '../components/PaymentModal';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, planName: '', planPrice: '' });
  const [showDemo, setShowDemo] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 23, minutes: 59, seconds: 59 });
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 15px 40px rgba(59, 130, 246, 0.4)" },
    tap: { scale: 0.95 }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleGetStarted = () => {
    navigate('/home');
  };

  const handleFreeTrial = () => {
    navigate('/login');
  };

  const handlePlanPurchase = (planName, planPrice) => {

    navigate('/payment', { state: { planName, planPrice } });
  };

  const closePaymentModal = () => {
    setPaymentModal({ isOpen: false, planName: '', planPrice: '' });
  };

  const toggleDemo = () => {
    setShowDemo(!showDemo);
  };

  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating Particles Background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className="nav-content">
          <motion.h2
            className="logo"
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.3 }}
          >
            <FaRocket style={{ marginRight: '8px' }} />
            NutriTrack
          </motion.h2>
          <motion.button
            className="loginButton"
            onClick={handleFreeTrial}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="hero"
        variants={itemVariants}
        style={{ y, opacity }}
      >
        <div className="heroContent">
          <motion.h1
            className="heroTitle"
            variants={itemVariants}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your <span className="highlight">Health Journey</span>
          </motion.h1>
          <motion.p
            className="heroSubtitle"
            variants={itemVariants}
          >
            Personalized nutrition tracking that adapts to your lifestyle, goals, and preferences.
            Start your journey to better health today with cutting-edge technology.
          </motion.p>
          <motion.div
            className="heroButtons"
            variants={itemVariants}
          >
            <motion.button
              className="ctaButton primary"
              onClick={handleGetStarted}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaRocket style={{ marginRight: '8px' }} />
              Start Free Trial
            </motion.button>
            <motion.button
              className="ctaButton secondary"
              onClick={toggleDemo}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaPlay style={{ marginRight: '8px' }} />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            className="countdown"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <FaClock style={{ marginRight: '8px' }} />
            Limited Time Offer: 50% Off Premium - Ends in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </motion.div>
        </div>

        {/* Floating Cards */}
        <motion.div className="floating-cards" variants={floatingVariants} animate="animate">
          <motion.div className="floating-card card1" whileHover={{ scale: 1.1 }}>
            <FaAppleAlt />
          </motion.div>
          <motion.div className="floating-card card2" whileHover={{ scale: 1.1 }}>
            <FaChartLine />
          </motion.div>
          <motion.div className="floating-card card3" whileHover={{ scale: 1.1 }}>
            <FaHeartbeat />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            className="demo-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleDemo}
          >
            <motion.div
              className="demo-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Product Demo</h3>
              <div className="demo-video">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="NutriTrack Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <button onClick={toggleDemo}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Value Propositions */}
      <motion.section
        className="features"
        variants={itemVariants}
      >
        <motion.h2
          className="sectionTitle"
          variants={itemVariants}
        >
          Why Choose NutriTrack
        </motion.h2>
        <motion.div
          className="featuresGrid"
          variants={containerVariants}
        >
          <motion.div
            className="featureItem"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <FaChartLine className="featureIcon" />
            <h3>Real-time Analytics</h3>
            <p>Monitor your nutrition intake, weight changes, and health metrics in real-time with beautiful charts.</p>
          </motion.div>
          <motion.div
            className="featureItem"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <FaAppleAlt className="featureIcon" />
            <h3>Personalized Plans</h3>
            <p>Personalized meal plans designed by nutritionists and powered by advanced algorithms.</p>
          </motion.div>
          <motion.div
            className="featureItem"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <FaUsers className="featureIcon" />
            <h3>Community Support</h3>
            <p>Join thousands of users sharing recipes, tips, and celebrating successes together.</p>
          </motion.div>
          <motion.div
            className="featureItem"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <FaShieldAlt className="featureIcon" />
            <h3>Privacy First</h3>
            <p>Your health data is encrypted and secure. We never share your personal information.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="how-it-works"
        variants={itemVariants}
      >
        <motion.h2
          className="sectionTitle"
          variants={itemVariants}
        >
          How It Works
        </motion.h2>
        <motion.div
          className="stepsGrid"
          variants={containerVariants}
        >
          <motion.div
            className="stepCard"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="stepNumber">1</div>
            <h3>Create Your Profile</h3>
            <p>Tell us about your goals, preferences, and lifestyle to get personalized recommendations.</p>
          </motion.div>
          <motion.div
            className="stepCard"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="stepNumber">2</div>
            <h3>Track Your Meals</h3>
            <p>Log your meals and snacks with our easy-to-use food database and barcode scanner.</p>
          </motion.div>
          <motion.div
            className="stepCard"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="stepNumber">3</div>
            <h3>Monitor Progress</h3>
            <p>View detailed analytics and adjust your plan as you work towards your goals.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Social Proof Section */}
      <motion.section
        className="socialProof"
        variants={itemVariants}
      >
        <motion.h2
          className="sectionTitle"
          variants={itemVariants}
        >
          Trusted by Thousands
        </motion.h2>
        <motion.div
          className="socialProofGrid"
          variants={containerVariants}
        >
          <motion.div
            className="proofItem"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <div className="statNumber">100,000+</div>
            <p>Active Users</p>
          </motion.div>
          <motion.div
            className="proofItem"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            <div className="statNumber">4.9/5</div>
            <p>App Store Rating</p>
            <div className="stars">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="star" />)}
            </div>
          </motion.div>
          <motion.div
            className="proofItem"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            <div className="statNumber">98%</div>
            <p>User Satisfaction</p>
          </motion.div>
          <motion.div
            className="proofItem"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h3>Progress Tracking</h3>
            <p>Visualize your health journey with detailed analytics</p>
            <motion.button
              className="demo-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Pricing Plans */}
      <motion.section
        className="pricing"
        variants={itemVariants}
      >
        <motion.h2
          className="sectionTitle"
          variants={itemVariants}
        >
          Choose Your Plan
        </motion.h2>
        <motion.div
          className="pricingGrid"
          variants={containerVariants}
        >
          <motion.div
            className="pricingCard"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -15, rotateY: 5 }}
          >
            <h3>Basic Plan</h3>
            <div className="price">₹799/month</div>
            <ul>
              <li><FaCheckCircle /> Basic meal tracking</li>
              <li><FaCheckCircle /> Daily nutrition summary</li>
              <li><FaCheckCircle /> Access to community recipes</li>
              <li><FaCheckCircle /> Email support</li>
            </ul>
            <motion.button
              className="pricingButton"
              onClick={() => handlePlanPurchase('Basic Plan', '₹799/month')}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Get Started
            </motion.button>
          </motion.div>
          <motion.div
            className="pricingCard pro"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -15, rotateY: 5 }}
          >
            <h3>Pro Plan</h3>
            <div className="price">₹1199/month</div>
            <ul>
              <li><FaCheckCircle /> All Basic features</li>
              <li><FaCheckCircle /> Custom meal planning</li>
              <li><FaCheckCircle /> Progress tracking with charts</li>
              <li><FaCheckCircle /> Recipe customization</li>
              <li><FaCheckCircle /> Chat support</li>
            </ul>
            <motion.button
              className="pricingButton pro"
              onClick={() => handlePlanPurchase('Pro Plan', '₹1199/month')}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Go Pro
            </motion.button>
          </motion.div>
          <motion.div
            className="pricingCard premium"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -15, rotateY: 5 }}
          >
            <h3>Premium Plan</h3>
            <div className="price">₹1599/month</div>
            <ul>
              <li><FaCheckCircle /> All Pro features</li>
              <li><FaCheckCircle /> Personalized meal recommendations</li>
              <li><FaCheckCircle /> Advanced analytics and reports</li>
              <li><FaCheckCircle /> Unlimited meal plans</li>
              <li><FaCheckCircle /> Priority support</li>
            </ul>
            <motion.button
              className="pricingButton premium"
              onClick={() => handlePlanPurchase('Premium Plan', '₹1599/month')}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Go Premium
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Success Stories */}
      <motion.section
        className="testimonials"
        variants={itemVariants}
      >
        <motion.h2
          className="sectionTitle"
          variants={itemVariants}
        >
          Success Stories from Our Community
        </motion.h2>
        <motion.div
          className="testimonialsGrid"
          variants={containerVariants}
        >
          <motion.div
            className="testimonialCard"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10, rotateX: 5 }}
          >
            <p>"Lost 25 pounds in 4 months with NutriTrack's recommendations. The meal timing guidance was a game-changer!"</p>
            <cite>- Jennifer L., Weight Loss Journey</cite>
            <div className="stars">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="star" />)}
            </div>
          </motion.div>
          <motion.div
            className="testimonialCard"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10, rotateX: 5 }}
          >
            <p>"Gained 12 pounds of muscle while improving my overall health. The macronutrient tracking is spot on."</p>
            <cite>- Alex M., Fitness Enthusiast</cite>
            <div className="stars">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="star" />)}
            </div>
          </motion.div>
          <motion.div
            className="testimonialCard"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10, rotateX: 5 }}
          >
            <p>"Managing PCOS became so much easier with the condition-specific meal plans. Highly recommend!"</p>
            <cite>- Priya S., Health Warrior</cite>
            <div className="stars">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="star" />)}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta"
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
          className="ctaButtonSecondary"
          onClick={handleFreeTrial}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Start Your Free Trial Today
        </motion.button>
      </motion.section>

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        planName={paymentModal.planName}
        planPrice={paymentModal.planPrice}
      />

    </motion.div>
  );
};

export default LandingPage;
