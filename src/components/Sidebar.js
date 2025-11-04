// Sidebar.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ChefHat,
  Calendar,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Footprints,
  Utensils,
  Target,
  Plus,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const {
    trackingData,
    userProfile,
    theme,
    setTheme,
    sidebarCollapsed,
    setSidebarCollapsed
  } = useAppContext();

  const { meals, waterIntake, steps, goals } = trackingData;
  const { personalInfo } = userProfile;

  const [expandedSections, setExpandedSections] = useState({
    meals: false,
    recipes: false,
    account: false
  });

  // Calculate real-time data
  const totalCalories = meals.reduce((sum, meal) => sum + (meal.status === 'done' ? meal.calories : 0), 0);
  const completedMeals = meals.filter(meal => meal.status === 'done').length;
  const waterLiters = (waterIntake / 1000).toFixed(1);
  const waterProgress = Math.min((waterIntake / goals.water) * 100, 100);
  const stepsProgress = Math.min((steps / goals.steps) * 100, 100);

  // BMI calculation
  const bmi = personalInfo.height && personalInfo.weight
    ? (personalInfo.weight / Math.pow(personalInfo.height / 100, 2)).toFixed(1)
    : null;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  return (
    <motion.nav
      className="sidebar"
      style={styles.sidebar}
      variants={sidebarVariants}
      animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        style={styles.toggleButton}
      >
        {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* User Profile Section */}
      <div style={styles.userProfile}>
        <div style={styles.avatar}>
          {personalInfo.profilePicture ? (
            <img src={personalInfo.profilePicture} alt="Profile" style={styles.avatarImg} />
          ) : (
            <div style={styles.avatarPlaceholder}>
              {personalInfo.name ? personalInfo.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              style={styles.userInfo}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div style={styles.userName}>{personalInfo.name || 'User'}</div>
              <div style={styles.userStatus}>
                BMI: {bmi || 'Set profile'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Stats Mini-Widgets */}
      <div style={styles.quickStats}>
        {/* Calories Widget */}
        <div style={styles.miniWidget}>
          <Utensils size={16} color="#10b981" />
          <div style={styles.widgetContent}>
            <div style={styles.widgetValue}>{totalCalories}</div>
            <div style={styles.widgetLabel}>Cal</div>
          </div>
        </div>

        {/* Water Widget */}
        <div style={styles.miniWidget}>
          <Droplets size={16} color="#06b6d4" />
          <div style={styles.widgetContent}>
            <div style={styles.widgetValue}>{waterLiters}L</div>
            <div style={styles.widgetLabel}>Water</div>
          </div>
          <div style={styles.miniProgressBar}>
            <div
              style={{
                ...styles.miniProgressFill,
                width: `${waterProgress}%`,
                backgroundColor: '#06b6d4'
              }}
            />
          </div>
        </div>

        {/* Steps Widget */}
        <div style={styles.miniWidget}>
          <Footprints size={16} color="#8b5cf6" />
          <div style={styles.widgetContent}>
            <div style={styles.widgetValue}>{steps.toLocaleString()}</div>
            <div style={styles.widgetLabel}>Steps</div>
          </div>
          <div style={styles.miniProgressBar}>
            <div
              style={{
                ...styles.miniProgressFill,
                width: `${stepsProgress}%`,
                backgroundColor: '#8b5cf6'
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div style={styles.navSections}>
        {/* Home/Dashboard */}
        <div
          style={activeSection === 'Dashboard' ? styles.navItemActive : styles.navItem}
          onClick={() => setActiveSection('Dashboard')}
        >
          <Home size={20} />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                style={styles.navText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Home
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Meal Tracker Section */}
        <div style={styles.navSection}>
          <div
            style={styles.navItem}
            onClick={() => toggleSection('meals')}
          >
            <Utensils size={20} />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  style={styles.navText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Meal Tracker
                </motion.span>
              )}
            </AnimatePresence>
            {!sidebarCollapsed && (
              expandedSections.meals ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </div>
          <AnimatePresence>
            {expandedSections.meals && !sidebarCollapsed && (
              <motion.div
                style={styles.subMenu}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {meals.map(meal => (
                  <div key={meal.id} style={styles.subMenuItem}>
                    <span style={styles.mealIcon}>{meal.icon}</span>
                    <span style={styles.subMenuText}>{meal.name.split(' ')[0]}</span>
                    <span style={styles.mealCalories}>{meal.calories}cal</span>
                  </div>
                ))}
                <button
                  style={styles.addMealButton}
                  onClick={() => setActiveSection('Tracking')}
                >
                  <Plus size={14} />
                  Add Meal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recipes & Meal Plans */}
        <div style={styles.navSection}>
          <div
            style={styles.navItem}
            onClick={() => toggleSection('recipes')}
          >
            <ChefHat size={20} />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  style={styles.navText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Recipes & Plans
                </motion.span>
              )}
            </AnimatePresence>
            {!sidebarCollapsed && (
              expandedSections.recipes ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </div>
          <AnimatePresence>
            {expandedSections.recipes && !sidebarCollapsed && (
              <motion.div
                style={styles.subMenu}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div style={styles.subMenuItem} onClick={() => setActiveSection('Recipes')}>
                  Browse Recipes
                </div>
                <div style={styles.subMenuItem} onClick={() => setActiveSection('Meal Kits')}>
                  Meal Plans
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress & Stats */}
        <div
          style={activeSection === 'Progress' ? styles.navItemActive : styles.navItem}
          onClick={() => setActiveSection('Tracking')}
        >
          <BarChart3 size={20} />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                style={styles.navText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Progress & Stats
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Account Section */}
      <div style={styles.accountSection}>
        <div style={styles.navSection}>
          <div
            style={styles.navItem}
            onClick={() => toggleSection('account')}
          >
            <User size={20} />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  style={styles.navText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Account
                </motion.span>
              )}
            </AnimatePresence>
            {!sidebarCollapsed && (
              expandedSections.account ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </div>
          <AnimatePresence>
            {expandedSections.account && !sidebarCollapsed && (
              <motion.div
                style={styles.subMenu}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div style={styles.subMenuItem} onClick={() => setActiveSection('Profile')}>
                  Profile Management
                </div>
                <div style={styles.subMenuItem}>
                  Settings
                </div>
                <div style={styles.subMenuItem}>
                  <LogOut size={14} />
                  Logout
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={styles.themeToggle}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </motion.nav>
  );
};

const styles = {
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    background: 'var(--background)',
    borderRight: '1px solid var(--glass-border)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    overflow: 'hidden',
  },
  toggleButton: {
    position: 'absolute',
    top: '20px',
    right: '10px',
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--text)',
    zIndex: 10,
    transition: 'all 0.2s ease',
  },
  userProfile: {
    padding: '80px 20px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid var(--glass-border)',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  userName: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text)',
    marginBottom: '4px',
  },
  userStatus: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  quickStats: {
    padding: '20px',
    borderBottom: '1px solid var(--glass-border)',
    display: 'flex',
    gap: '12px',
  },
  miniWidget: {
    flex: 1,
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
  },
  widgetContent: {
    flex: 1,
  },
  widgetValue: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--text)',
  },
  widgetLabel: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
  },
  miniProgressBar: {
    position: 'absolute',
    bottom: '8px',
    left: '12px',
    right: '12px',
    height: '2px',
    background: 'var(--glass-bg)',
    borderRadius: '1px',
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: '1px',
    transition: 'width 0.3s ease',
  },
  navSections: {
    flex: 1,
    padding: '20px 0',
  },
  navSection: {
    marginBottom: '8px',
  },
  navItem: {
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  navItemActive: {
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    color: 'var(--primary)',
    background: 'var(--glass-bg)',
    borderLeft: '3px solid var(--primary)',
    fontWeight: '600',
  },
  navText: {
    flex: 1,
    fontSize: '14px',
  },
  subMenu: {
    overflow: 'hidden',
    background: 'var(--glass-bg)',
    margin: '0 8px',
    borderRadius: '8px',
    border: '1px solid var(--glass-border)',
  },
  subMenuItem: {
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    fontSize: '13px',
    transition: 'background 0.2s ease',
  },
  mealIcon: {
    fontSize: '16px',
  },
  mealCalories: {
    marginLeft: 'auto',
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  addMealButton: {
    width: '100%',
    padding: '10px 16px',
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: '500',
  },
  accountSection: {
    borderTop: '1px solid var(--glass-border)',
    padding: '20px 0',
  },
  themeToggle: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--text)',
    transition: 'all 0.2s ease',
  },
};

export default Sidebar;
