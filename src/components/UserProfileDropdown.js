import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';

const UserProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useAppContext();

  // Mock user data - in a real app, this would come from context or API
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'Premium Plan',
    planExpiry: '2024-12-31',
    avatar: '👤'
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  };

  return (
    <div style={styles.container}>
      <button
        onClick={toggleDropdown}
        style={styles.profileButton}
        onMouseEnter={(e) => e.target.style.backgroundColor = styles.profileButtonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = styles.profileButton.backgroundColor}
      >
        <span style={styles.avatar}>{user.avatar}</span>
        <span style={styles.userName}>{user.name}</span>
        <span style={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={styles.dropdown}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <div style={styles.userInfo}>
              <div style={styles.userHeader}>
                <span style={styles.avatarLarge}>{user.avatar}</span>
                <div style={styles.userDetails}>
                  <div style={styles.userNameLarge}>{user.name}</div>
                  <div style={styles.userEmail}>{user.email}</div>
                </div>
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.planInfo}>
              <h4 style={styles.sectionTitle}>Current Plan</h4>
              <div style={styles.planDetails}>
                <div style={styles.planName}>{user.plan}</div>
                <div style={styles.planExpiry}>Expires: {user.planExpiry}</div>
              </div>
            </div>

            <div style={styles.divider}></div>

            <button style={styles.dropdownItem} onClick={() => {}}>
              👤 View Profile
            </button>
            <button style={styles.dropdownItem} onClick={() => {}}>
              ⚙️ Settings
            </button>
            <button style={styles.dropdownItem} onClick={() => {}}>
              ❓ Help & Support
            </button>

            <div style={styles.divider}></div>

            <button
              style={styles.logoutButton}
              onClick={onLogout}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.logoutButton.backgroundColor}
            >
              🚪 Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  profileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#387c53',
    transition: 'background-color 0.3s',
  },
  profileButtonHover: {
    backgroundColor: '#E8F5E9',
  },
  avatar: {
    fontSize: '20px',
  },
  userName: {
    fontWeight: '500',
  },
  arrow: {
    fontSize: '12px',
    color: '#666',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '280px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    padding: '16px',
    marginTop: '8px',
  },
  userInfo: {
    marginBottom: '12px',
  },
  userHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatarLarge: {
    fontSize: '32px',
  },
  userDetails: {
    flex: 1,
  },
  userNameLarge: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '2px',
  },
  userEmail: {
    fontSize: '14px',
    color: '#666',
  },
  divider: {
    height: '1px',
    backgroundColor: '#eee',
    margin: '12px 0',
  },
  planInfo: {
    marginBottom: '8px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  planDetails: {
    backgroundColor: '#f8f9fa',
    padding: '8px 12px',
    borderRadius: '6px',
  },
  planName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#387c53',
    marginBottom: '2px',
  },
  planExpiry: {
    fontSize: '12px',
    color: '#666',
  },
  dropdownItem: {
    display: 'block',
    width: '100%',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
    textAlign: 'left',
    marginBottom: '4px',
    transition: 'background-color 0.2s',
  },
  logoutButton: {
    display: 'block',
    width: '100%',
    padding: '10px 12px',
    backgroundColor: '#ffebee',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#d32f2f',
    fontWeight: '500',
    textAlign: 'left',
    transition: 'background-color 0.2s',
  },
  logoutButtonHover: {
    backgroundColor: '#ffcdd2',
  },
};

export default UserProfileDropdown;
