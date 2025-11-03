import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import { Target, User, Activity, Apple, Calculator, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const PersonalizedPlan = ({ setActiveSection }) => {
  const { userProfile, updateUserProfile, updateGoals } = useAppContext();
  const { personalInfo, goals } = userProfile;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    goal: personalInfo.goal || '',
    age: personalInfo.age || '',
    gender: personalInfo.gender || '',
    height: personalInfo.height || '',
    weight: personalInfo.weight || '',
    activityLevel: personalInfo.activityLevel || '',
    dietaryPreferences: personalInfo.dietaryPreferences || [],
    allergies: personalInfo.allergies || [],
    medicalConditions: personalInfo.medicalConditions || []
  });

  const [calculatedPlan, setCalculatedPlan] = useState(null);

  const steps = [
    { title: 'Goal Selection', icon: Target },
    { title: 'Personal Info', icon: User },
    { title: 'Activity Level', icon: Activity },
    { title: 'Dietary Preferences', icon: Apple },
    { title: 'Your Plan', icon: Calculator }
  ];

  const goalOptions = [
    { id: 'weight_loss', title: 'Weight Loss', description: 'Lose weight in a healthy, sustainable way', icon: '⚖️' },
    { id: 'weight_gain', title: 'Weight Gain', description: 'Build muscle and gain healthy weight', icon: '💪' },
    { id: 'maintenance', title: 'Weight Maintenance', description: 'Maintain current weight and health', icon: '🎯' },
    { id: 'muscle_gain', title: 'Muscle Gain', description: 'Increase muscle mass and strength', icon: '🏋️' }
  ];

  const activityLevels = [
    { id: 'sedentary', title: 'Sedentary', description: 'Little to no exercise, desk job', multiplier: 1.2 },
    { id: 'lightly_active', title: 'Lightly Active', description: 'Light exercise 1-3 days/week', multiplier: 1.375 },
    { id: 'moderately_active', title: 'Moderately Active', description: 'Moderate exercise 3-5 days/week', multiplier: 1.55 },
    { id: 'very_active', title: 'Very Active', description: 'Hard exercise 6-7 days/week', multiplier: 1.725 },
    { id: 'extremely_active', title: 'Extremely Active', description: 'Very hard exercise, physical job', multiplier: 1.9 }
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Low-Carb', 'Mediterranean',
    'Paleo', 'Gluten-Free', 'Dairy-Free', 'Low-Sodium', 'Heart-Healthy'
  ];

  const commonAllergies = [
    'Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Fish', 'Shellfish', 'Soy', 'Wheat', 'Sesame'
  ];

  const calculateBMR = (weight, height, age, gender) => {
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  };

  const calculateTDEE = (bmr, activityLevel) => {
    const activityMultiplier = activityLevels.find(level => level.id === activityLevel)?.multiplier || 1.2;
    return bmr * activityMultiplier;
  };

  const calculateMacros = (calories, goal) => {
    let proteinRatio, carbRatio, fatRatio;

    switch (goal) {
      case 'weight_loss':
        proteinRatio = 0.35; // 35% protein
        carbRatio = 0.40; // 40% carbs
        fatRatio = 0.25; // 25% fat
        break;
      case 'muscle_gain':
        proteinRatio = 0.30; // 30% protein
        carbRatio = 0.50; // 50% carbs
        fatRatio = 0.20; // 20% fat
        break;
      case 'weight_gain':
        proteinRatio = 0.25; // 25% protein
        carbRatio = 0.55; // 55% carbs
        fatRatio = 0.20; // 20% fat
        break;
      default: // maintenance
        proteinRatio = 0.25; // 25% protein
        carbRatio = 0.50; // 50% carbs
        fatRatio = 0.25; // 25% fat
    }

    return {
      protein: Math.round((calories * proteinRatio) / 4), // 4 calories per gram
      carbs: Math.round((calories * carbRatio) / 4), // 4 calories per gram
      fat: Math.round((calories * fatRatio) / 9) // 9 calories per gram
    };
  };

  const generatePlan = () => {
    const { weight, height, age, gender, activityLevel, goal } = formData;

    if (!weight || !height || !age || !gender || !activityLevel || !goal) {
      return null;
    }

    const bmr = calculateBMR(weight, height, age, gender);
    let tdee = calculateTDEE(bmr, activityLevel);

    // Adjust calories based on goal
    switch (goal) {
      case 'weight_loss':
        tdee -= 500; // 500 calorie deficit
        break;
      case 'weight_gain':
        tdee += 500; // 500 calorie surplus
        break;
      case 'muscle_gain':
        tdee += 250; // Moderate surplus for muscle gain
        break;
      default:
        // maintenance - no change
        break;
    }

    const macros = calculateMacros(tdee, goal);
    const bmi = weight / Math.pow(height / 100, 2);

    return {
      dailyCalories: Math.round(tdee),
      macros,
      bmi: bmi.toFixed(1),
      bmr: Math.round(bmr),
      tdee: Math.round(calculateTDEE(bmr, activityLevel)),
      weeklyChange: goal === 'weight_loss' ? -0.5 : goal === 'weight_gain' ? 0.5 : 0
    };
  };

  useEffect(() => {
    if (currentStep === 4) {
      const plan = generatePlan();
      setCalculatedPlan(plan);
    }
  }, [currentStep, formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSavePlan = () => {
    updateUserProfile({
      personalInfo: { ...personalInfo, ...formData }
    });
    updateGoals({
      calories: calculatedPlan.dailyCalories,
      protein: calculatedPlan.macros.protein,
      carbs: calculatedPlan.macros.carbs,
      fat: calculatedPlan.macros.fat
    });
    setActiveSection('Dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Goal Selection
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>What's your primary goal?</h2>
            <div style={styles.goalsGrid}>
              {goalOptions.map((goal) => (
                <motion.div
                  key={goal.id}
                  style={{
                    ...styles.goalCard,
                    borderColor: formData.goal === goal.id ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'
                  }}
                  onClick={() => handleInputChange('goal', goal.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div style={styles.goalIcon}>{goal.icon}</div>
                  <h3 style={styles.goalTitle}>{goal.title}</h3>
                  <p style={styles.goalDescription}>{goal.description}</p>
                  {formData.goal === goal.id && (
                    <CheckCircle size={24} color="#3b82f6" style={styles.checkIcon} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 1: // Personal Info
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Tell us about yourself</h2>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  style={styles.input}
                  placeholder="Enter your age"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  style={styles.select}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  style={styles.input}
                  placeholder="Enter height in cm"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  style={styles.input}
                  placeholder="Enter weight in kg"
                />
              </div>
            </div>
          </div>
        );

      case 2: // Activity Level
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>What's your activity level?</h2>
            <div style={styles.activityGrid}>
              {activityLevels.map((level) => (
                <motion.div
                  key={level.id}
                  style={{
                    ...styles.activityCard,
                    borderColor: formData.activityLevel === level.id ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'
                  }}
                  onClick={() => handleInputChange('activityLevel', level.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 style={styles.activityTitle}>{level.title}</h3>
                  <p style={styles.activityDescription}>{level.description}</p>
                  {formData.activityLevel === level.id && (
                    <CheckCircle size={20} color="#3b82f6" style={styles.checkIcon} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 3: // Dietary Preferences
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Dietary preferences & restrictions</h2>
            <div style={styles.preferencesSection}>
              <h3 style={styles.sectionSubtitle}>Dietary Preferences</h3>
              <div style={styles.optionsGrid}>
                {dietaryOptions.map((option) => (
                  <motion.button
                    key={option}
                    style={{
                      ...styles.optionButton,
                      backgroundColor: formData.dietaryPreferences.includes(option) ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => handleArrayToggle('dietaryPreferences', option)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
            <div style={styles.preferencesSection}>
              <h3 style={styles.sectionSubtitle}>Food Allergies</h3>
              <div style={styles.optionsGrid}>
                {commonAllergies.map((allergy) => (
                  <motion.button
                    key={allergy}
                    style={{
                      ...styles.optionButton,
                      backgroundColor: formData.allergies.includes(allergy) ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => handleArrayToggle('allergies', allergy)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {allergy}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Your Plan
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Your Personalized Nutrition Plan</h2>
            {calculatedPlan ? (
              <motion.div
                style={styles.planContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div style={styles.planSummary}>
                  <div style={styles.planCard}>
                    <h3 style={styles.planCardTitle}>Daily Calorie Target</h3>
                    <div style={styles.calorieDisplay}>{calculatedPlan.dailyCalories}</div>
                    <p style={styles.calorieSubtext}>calories per day</p>
                  </div>
                  <div style={styles.planCard}>
                    <h3 style={styles.planCardTitle}>Macronutrient Breakdown</h3>
                    <div style={styles.macroGrid}>
                      <div style={styles.macroItem}>
                        <span style={styles.macroLabel}>Protein</span>
                        <span style={styles.macroValue}>{calculatedPlan.macros.protein}g</span>
                      </div>
                      <div style={styles.macroItem}>
                        <span style={styles.macroLabel}>Carbs</span>
                        <span style={styles.macroValue}>{calculatedPlan.macros.carbs}g</span>
                      </div>
                      <div style={styles.macroItem}>
                        <span style={styles.macroLabel}>Fat</span>
                        <span style={styles.macroValue}>{calculatedPlan.macros.fat}g</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.planDetails}>
                  <div style={styles.detailCard}>
                    <h4 style={styles.detailTitle}>Your Stats</h4>
                    <div style={styles.statsGrid}>
                      <div style={styles.statItem}>
                        <span style={styles.statLabel}>BMI</span>
                        <span style={styles.statValue}>{calculatedPlan.bmi}</span>
                      </div>
                      <div style={styles.statItem}>
                        <span style={styles.statLabel}>BMR</span>
                        <span style={styles.statValue}>{calculatedPlan.bmr} cal</span>
                      </div>
                      <div style={styles.statItem}>
                        <span style={styles.statLabel}>TDEE</span>
                        <span style={styles.statValue}>{calculatedPlan.tdee} cal</span>
                      </div>
                    </div>
                  </div>

                  <div style={styles.detailCard}>
                    <h4 style={styles.detailTitle}>Expected Results</h4>
                    <p style={styles.resultText}>
                      With this plan, you can expect to {formData.goal === 'weight_loss' ? 'lose' : formData.goal === 'weight_gain' ? 'gain' : 'maintain'} approximately {Math.abs(calculatedPlan.weeklyChange)} kg per week.
                    </p>
                    <div style={styles.preferencesSummary}>
                      <h5 style={styles.preferencesTitle}>Your Preferences:</h5>
                      <div style={styles.preferencesList}>
                        {formData.dietaryPreferences.length > 0 && (
                          <p><strong>Diet:</strong> {formData.dietaryPreferences.join(', ')}</p>
                        )}
                        {formData.allergies.length > 0 && (
                          <p><strong>Allergies:</strong> {formData.allergies.join(', ')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  style={styles.saveButton}
                  onClick={handleSavePlan}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save My Plan & Continue
                </motion.button>
              </motion.div>
            ) : (
              <div style={styles.errorMessage}>
                Unable to calculate your plan. Please go back and fill in all required information.
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Progress Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Create Your Personalized Nutrition Plan</h1>
        <div style={styles.progressContainer}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} style={styles.progressStep}>
                <div style={{
                  ...styles.stepCircle,
                  backgroundColor: index <= currentStep ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                  borderColor: index <= currentStep ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)'
                }}>
                  <Icon size={16} color={index <= currentStep ? '#ffffff' : '#cbd5e1'} />
                </div>
                <span style={{
                  ...styles.stepLabel,
                  color: index <= currentStep ? '#3b82f6' : '#cbd5e1'
                }}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div style={{
                    ...styles.progressLine,
                    backgroundColor: index < currentStep ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        style={styles.contentArea}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStepContent()}
      </motion.div>

      {/* Navigation */}
      <div style={styles.navigation}>
        <motion.button
          style={{
            ...styles.navButton,
            opacity: currentStep === 0 ? 0.5 : 1
          }}
          onClick={handlePrev}
          disabled={currentStep === 0}
          whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
          whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
        >
          <ArrowLeft size={20} />
          Previous
        </motion.button>

        {currentStep < steps.length - 1 && (
          <motion.button
            style={styles.navButton}
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
            <ArrowRight size={20} />
          </motion.button>
        )}
      </div>
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
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  progressStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  stepCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: '0.9rem',
    fontWeight: '500',
    minWidth: '80px',
    textAlign: 'center',
  },
  progressLine: {
    width: '60px',
    height: '2px',
    marginLeft: '10px',
  },
  contentArea: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '30px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '30px',
    minHeight: '500px',
  },
  stepContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  stepTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#ffffff',
  },
  goalsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  goalCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '20px',
    border: '2px solid',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  goalIcon: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  goalTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#ffffff',
  },
  goalDescription: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
    lineHeight: '1.4',
  },
  checkIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#ffffff',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
  },
  select: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
  },
  activityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '15px',
  },
  activityCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '20px',
    border: '2px solid',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  activityTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#ffffff',
  },
  activityDescription: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
    lineHeight: '1.4',
  },
  preferencesSection: {
    marginBottom: '30px',
  },
  sectionSubtitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#ffffff',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '10px',
  },
  optionButton: {
    padding: '10px 15px',
    borderRadius: '25px',
    border: 'none',
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  planContainer: {
    textAlign: 'center',
  },
  planSummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  planCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  planCardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#cbd5e1',
  },
  calorieDisplay: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: '5px',
  },
  calorieSubtext: {
    color: '#cbd5e1',
    fontSize: '0.9rem',
  },
  macroGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
  },
  macroItem: {
    textAlign: 'center',
  },
  macroLabel: {
    display: 'block',
    fontSize: '0.9rem',
    color: '#cbd5e1',
    marginBottom: '5px',
  },
  macroValue: {
    display: 'block',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  planDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  detailCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'left',
  },
  detailTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#ffffff',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
  },
  statItem: {
    textAlign: 'center',
  },
  statLabel: {
    display: 'block',
    fontSize: '0.9rem',
    color: '#cbd5e1',
    marginBottom: '5px',
  },
  statValue: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  resultText: {
    color: '#cbd5e1',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  preferencesSummary: {
    marginTop: '20px',
  },
  preferencesTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#ffffff',
  },
  preferencesList: {
    color: '#cbd5e1',
    lineHeight: '1.5',
  },
  saveButton: {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: '#ffffff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  errorMessage: {
    textAlign: 'center',
    color: '#ef4444',
    fontSize: '1.1rem',
    padding: '40px',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '25px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default PersonalizedPlan;
