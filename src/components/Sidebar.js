// Sidebar.js
import React from 'react';
import { FaBook, FaList, FaChartLine, FaCog, FaUser } from 'react-icons/fa'; // Using react-icons for icons

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { name: 'Dashboard', icon: <FaChartLine /> },
    { name: 'Recipes', icon: <FaBook /> },
    { name: 'My Plan', icon: <FaList /> },
    { name: 'Tracking', icon: <FaChartLine /> },
    { name: 'Profile', icon: <FaUser /> },
  ];

  return (
    <nav style={styles.sidebar}>
      <div style={styles.logo}>
        <span style={styles.appName}>NutriTrack</span>
      </div>
      <ul style={styles.navList}>
        {navItems.map((item) => (
          <li
            key={item.name}
            style={item.name === activeSection ? styles.navItemActive : styles.navItem}
            onClick={() => setActiveSection(item.name)}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            {item.name}
          </li>
        ))}
      </ul>
      <div style={styles.settings}>
        <FaCog style={styles.settingsIcon} />
        <span style={styles.settingsText}>Settings</span>
      </div>
    </nav>
  );
};

const styles = {
  sidebar: {
    width: '240px',
    backgroundColor: '#E8F5E9', // Light green background
    color: '#387c53', // Dark green text
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  logo: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
      color: '#387c53'
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  navItem: {
    padding: '15px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
  },
  navItemActive: {
    padding: '15px 20px',
    cursor: 'pointer',
    backgroundColor: '#DCEDC8', // Slightly darker green for active state
    borderLeft: '5px solid #387c53',
    fontWeight: 'bold',
    color: '#1B5E20',
    display: 'flex',
    alignItems: 'center',
  },
  navIcon: {
      marginRight: '10px'
  },
  settings: {
    padding: '15px 20px',
    borderTop: '1px solid #C8E6C9',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#387c53',
  },
  settingsIcon: {
      marginRight: '10px',
      fontSize: '20px'
  },
  settingsText: {
      fontWeight: '600'
  }
};

export default Sidebar;