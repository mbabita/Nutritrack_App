import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import WaterTracker from './WaterTracker';
import StepsTracker from './StepsTracker';
import MealTracker from './MealTracker';
import ProgressCharts from './ProgressCharts';
import TodayTasks from './TodayTasks';
import DailySummary from './DailySummary';
import Footer from './Footer';
import { Calendar, Target, TrendingUp, Award, Droplets, Footprints, Utensils, Plus } from 'lucide-react';

const Dashboard = ({ setActiveSection }) => {
  const { trackingData, userProfile, updateWaterIntake, updateMeals, updateSteps } = useAppContext();
  const { meals, waterIntake, steps, goals } = trackingData;
  const { personalInfo } = userProfile;

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalCalories = meals.reduce((sum, meal) => sum + (meal.status === 'done' ? meal.calories : 0), 0);
  const completedMeals = meals.filter(meal => meal.status === 'done').length;
  const pendingMeals = meals.filter(meal => meal.status === 'pending').length;

  const handleMealAction = (mealId, action) => {
    const updatedMeals = meals.map(meal =>
      meal.id === mealId ? { ...meal, status: action } : meal
    );
    updateMeals(updatedMeals);
  };

  const handleResetMeals = () => {
    const resetMeals = meals.map(meal => ({ ...meal, status: 'pending' }));
    updateMeals(resetMeals);
  };

  const handleAddWater = (amount) => {
    updateWaterIntake(waterIntake + amount);
  };

  const handleResetWater = () => {
    updateWaterIntake(0);
  };

  const motivationalQuotes = [
    "Every healthy choice you make is a victory!",
    "Small changes lead to big results.",
    "Your body deserves the best fuel.",
    "Progress, not perfection.",
    "One meal at a time, you're building a healthier you."
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div style={styles.container}>
      {/* Welcome Header */}
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.greeting}>
              Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 18 ? 'afternoon' : 'evening'}, {personalInfo.name || 'User'}! 👋
            </h1>
            <p style={styles.date}>{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p style={styles.quote}>"{randomQuote}"</p>
          </div>
          <div style={styles.headerStats}>
            <div style={styles.statCard}>
              <Target size={24} color="#3b82f6" />
              <div>
                <div style={styles.statValue}>{totalCalories}</div>
                <div style={styles.statLabel}>Calories Today</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <Award size={24} color="#10b981" />
              <div>
                <div style={styles.statValue}>{completedMeals}/{meals.length}</div>
                <div style={styles.statLabel}>Meals Completed</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Overview Cards */}
      <motion.div
        style={styles.overviewGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div style={styles.overviewCard}>
          <div style={styles.cardHeader}>
            <Utensils size={20} color="#3b82f6" />
            <span style={styles.cardTitle}>Calories</span>
          </div>
          <div style={styles.cardValue}>{totalCalories} / {goals.calories}</div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${Math.min((totalCalories / goals.calories) * 100, 100)}%`,
                backgroundColor: totalCalories >= goals.calories ? '#10b981' : '#3b82f6'
              }}
            />
          </div>
          <div style={styles.cardSubtitle}>
            {totalCalories >= goals.calories ? 'Goal achieved! 🎉' : `${goals.calories - totalCalories} remaining`}
          </div>
        </div>

        <div style={styles.overviewCard}>
          <div style={styles.cardHeader}>
            <Droplets size={20} color="#06b6d4" />
            <span style={styles.cardTitle}>Water</span>
          </div>
          <div style={styles.cardValue}>{(waterIntake / 1000).toFixed(1)}L / {(goals.water / 1000).toFixed(1)}L</div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${Math.min((waterIntake / goals.water) * 100, 100)}%`,
                backgroundColor: '#06b6d4'
              }}
            />
          </div>
          <div style={styles.cardSubtitle}>
            {waterIntake >= goals.water ? 'Hydration goal met! 💧' : `${((goals.water - waterIntake) / 250).toFixed(0)} glasses left`}
          </div>
        </div>

        <div style={styles.overviewCard}>
          <div style={styles.cardHeader}>
            <Footprints size={20} color="#8b5cf6" />
            <span style={styles.cardTitle}>Steps</span>
          </div>
          <div style={styles.cardValue}>{steps.toLocaleString()} / {goals.steps.toLocaleString()}</div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${Math.min((steps / goals.steps) * 100, 100)}%`,
                backgroundColor: '#8b5cf6'
              }}
            />
          </div>
          <div style={styles.cardSubtitle}>
            {steps >= goals.steps ? 'Step goal crushed! 🚶‍♀️' : `${(goals.steps - steps).toLocaleString()} steps to go`}
          </div>
        </div>

        <div style={styles.overviewCard}>
          <div style={styles.cardHeader}>
            <TrendingUp size={20} color="#f59e0b" />
            <span style={styles.cardTitle}>Weight</span>
          </div>
          <div style={styles.cardValue}>{personalInfo.weight || '70'} kg</div>
          <div style={styles.cardSubtitle}>
            {personalInfo.weight ? 'Current weight' : 'Set your weight in profile'}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        style={styles.quickActions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionsGrid}>
          <motion.button
            style={styles.actionButton}
            onClick={() => setActiveSection('Tracking')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Log Meal
          </motion.button>
          <motion.button
            style={styles.actionButton}
            onClick={() => handleAddWater(250)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Droplets size={20} />
            Add Water
          </motion.button>
          <motion.button
            style={styles.actionButton}
            onClick={() => setActiveSection('Recipes')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Utensils size={20} />
            View Recipes
          </motion.button>
          <motion.button
            style={styles.actionButton}
            onClick={() => setActiveSection('Meal Kits')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar size={20} />
            Meal Plans
          </motion.button>
        </div>
      </motion.div>

      {/* Today's Meal Summary & Water Tracker */}
      <div style={styles.mainContent}>
        <motion.div
          style={styles.leftColumn}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MealTracker
            meals={meals}
            onAction={handleMealAction}
            onReset={handleResetMeals}
          />
          <WaterTracker
            intake={waterIntake}
            onAdd={handleAddWater}
            onReset={handleResetWater}
          />
        </motion.div>

        <motion.div
          style={styles.rightColumn}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <TodayTasks meals={meals} waterIntake={waterIntake} />
          <StepsTracker />
          <div style={styles.progressSection}>
            <h3 style={styles.sectionTitle}>Weekly Progress</h3>
            <ProgressCharts meals={meals} exercises={[]} />
          </div>
        </motion.div>
      </div>

      {/* Health Insights */}
      <motion.div
        style={styles.insights}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h2 style={styles.sectionTitle}>Health Insights</h2>
        <div style={styles.insightsGrid}>
          <div style={styles.insightCard}>
            <div style={styles.insightIcon}>📊</div>
            <div>
              <div style={styles.insightTitle}>BMI Calculator</div>
              <div style={styles.insightValue}>
                {personalInfo.height && personalInfo.weight
                  ? ((personalInfo.weight / Math.pow(personalInfo.height / 100, 2)).toFixed(1))
                  : 'Set height & weight'
                }
              </div>
            </div>
          </div>
          <div style={styles.insightCard}>
            <div style={styles.insightIcon}>🎯</div>
            <div>
              <div style={styles.insightTitle}>Daily Goal Progress</div>
              <div style={styles.insightValue}>{Math.round((completedMeals / meals.length) * 100)}%</div>
            </div>
          </div>
          <div style={styles.insightCard}>
            <div style={styles.insightIcon}>🔥</div>
            <div>
              <div style={styles.insightTitle}>Calorie Streak</div>
              <div style={styles.insightValue}>5 days</div>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    minHeight: '100vh',
    color: '#ffffff',
    overflowX: 'hidden',
  },
  header: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '30px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  greeting: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  date: {
    fontSize: '1.1rem',
    color: '#cbd5e1',
    marginBottom: '10px',
  },
  quote: {
    fontSize: '1rem',
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  headerStats: {
    display: 'flex',
    gap: '20px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(59, 130, 246, 0.1)',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  overviewCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#ffffff',
  },
  cardValue: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '10px',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  cardSubtitle: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
  },
  quickActions: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '20px',
    textAlign: 'center',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    color: '#3b82f6',
    padding: '15px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    marginBottom: '40px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  progressSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  insights: {
    marginBottom: '40px',
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  insightCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  insightIcon: {
    fontSize: '2rem',
  },
  insightTitle: {
    fontSize: '1rem',
    color: '#cbd5e1',
    marginBottom: '5px',
  },
  insightValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
};

export default Dashboard;
