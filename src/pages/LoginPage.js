import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    height: '',
    weight: '',
    healthGoal: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (isLogin) {
      setLoginData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isLogin) {
      if (!loginData.email) newErrors.email = 'Email is required';
      if (!loginData.password) newErrors.password = 'Password is required';
    } else {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.height) newErrors.height = 'Height is required';
      if (!formData.weight) newErrors.weight = 'Weight is required';
      if (!formData.healthGoal) newErrors.healthGoal = 'Health goal is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Store login data if remember me is checked
        if (loginData.rememberMe) {
          localStorage.setItem('userEmail', loginData.email);
        }
        onLogin();
        navigate('/home');
      } else {
        // Store user data
        localStorage.setItem('userData', JSON.stringify(formData));
        localStorage.setItem('userEmail', formData.email);
        alert('Registration successful! Please login with your credentials.');
        setIsLogin(true);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!loginData.email) {
      setErrors({ email: 'Please enter your email first' });
      return;
    }
    alert('Password reset link sent to your email!');
    setShowForgotPassword(false);
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('userEmail');
    if (rememberedEmail) {
      setLoginData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
    }
  }, []);

  return (
    <div className="loginContainer">
      <motion.div
        className="loginCard"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="loginHeader">
          <motion.h1
            className="loginTitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {showForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
          </motion.h1>
          <motion.p
            className="loginSubtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {showForgotPassword
              ? 'Enter your email to receive reset instructions'
              : isLogin
                ? 'Sign in to continue your wellness journey'
                : 'Join NutriTrack and start your health transformation'
            }
          </motion.p>
        </div>

        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="loginForm">
            <div className="formGroup">
              <label className="formLabel">Email Address</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                className={`formInput ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </div>

            <motion.button
              type="submit"
              className="submitButton"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </motion.button>

            <button
              type="button"
              className="switchButton"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="loginForm">
            {!isLogin && (
              <>
                <div className="formGroup">
                  <label className="formLabel">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`formInput ${errors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="errorText">{errors.fullName}</span>}
                </div>

                <div className="formRow">
                  <div className="formGroup">
                    <label className="formLabel">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className={`formInput ${errors.dob ? 'error' : ''}`}
                    />
                    {errors.dob && <span className="errorText">{errors.dob}</span>}
                  </div>

                  <div className="formGroup">
                    <label className="formLabel">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`formInput ${errors.gender ? 'error' : ''}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && <span className="errorText">{errors.gender}</span>}
                  </div>
                </div>

                <div className="formRow">
                  <div className="formGroup">
                    <label className="formLabel">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className={`formInput ${errors.height ? 'error' : ''}`}
                      placeholder="170"
                      min="50"
                      max="250"
                    />
                    {errors.height && <span className="errorText">{errors.height}</span>}
                  </div>

                  <div className="formGroup">
                    <label className="formLabel">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className={`formInput ${errors.weight ? 'error' : ''}`}
                      placeholder="70"
                      min="20"
                      max="300"
                    />
                    {errors.weight && <span className="errorText">{errors.weight}</span>}
                  </div>
                </div>

                <div className="formGroup">
                  <label className="formLabel">Health Goal</label>
                  <select
                    name="healthGoal"
                    value={formData.healthGoal}
                    onChange={handleInputChange}
                    className={`formInput ${errors.healthGoal ? 'error' : ''}`}
                  >
                    <option value="">Select your primary goal</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="weight-gain">Weight Gain</option>
                    <option value="muscle-building">Muscle Building</option>
                    <option value="maintenance">Weight Maintenance</option>
                    <option value="general-health">General Health</option>
                  </select>
                  {errors.healthGoal && <span className="errorText">{errors.healthGoal}</span>}
                </div>
              </>
            )}

            <div className="formGroup">
              <label className="formLabel">Email Address</label>
              <input
                type="email"
                name="email"
                value={isLogin ? loginData.email : formData.email}
                onChange={handleInputChange}
                className={`formInput ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </div>

            <div className="formGroup">
              <label className="formLabel">Password</label>
              <input
                type="password"
                name="password"
                value={isLogin ? loginData.password : formData.password}
                onChange={handleInputChange}
                className={`formInput ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className="errorText">{errors.password}</span>}
            </div>

            {!isLogin && (
              <div className="formGroup">
                <label className="formLabel">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`formInput ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <span className="errorText">{errors.confirmPassword}</span>}
              </div>
            )}

            {isLogin && (
              <div className="formOptions">
                <label className="checkboxLabel">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <button
                  type="button"
                  className="forgotButton"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              className="submitButton"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </motion.button>

            <div className="formFooter">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  className="switchButton"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
