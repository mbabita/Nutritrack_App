import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  // Global state for tracking data
  const [trackingData, setTrackingData] = useState({
    meals: [
      { id: 1, name: 'Oatmeal with Berries', calories: 350, time: '8:00 AM', status: 'pending', icon: '🥐', photo: '', macros: { protein: 10, carbs: 50, fats: 15 } },
      { id: 2, name: 'Grilled Chicken Salad', calories: 450, time: '1:00 PM', status: 'pending', icon: '🍎', photo: '', macros: { protein: 30, carbs: 20, fats: 25 } },
      { id: 3, name: 'Apple and Peanut Butter', calories: 200, time: '4:00 PM', status: 'pending', icon: '🍊', photo: '', macros: { protein: 5, carbs: 25, fats: 10 } },
      { id: 4, name: 'Salmon with Quinoa', calories: 550, time: '8:00 PM', status: 'pending', icon: '🐟', photo: '', macros: { protein: 35, carbs: 40, fats: 30 } },
    ],
    waterIntake: 0,
    steps: 0,
    exercises: [],
    mood: '',
    notes: '',
    goals: { calories: 2000, water: 2000, meals: 4, steps: 10000 },
  });

  // User profile state
  const [userProfile, setUserProfile] = useState({
    personalInfo: {
      name: '',
      email: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      profilePicture: '',
    },
    dietaryPreferences: {
      dietType: '', // vegetarian, vegan, keto, paleo, etc.
      allergies: [],
      intolerances: [],
      preferredCuisines: [],
    },
    goals: {
      weightGoal: '',
      activityLevel: '',
      weeklyWorkouts: 0,
      dailyCalories: 2000,
      macroTargets: {
        protein: 150,
        carbs: 200,
        fats: 67,
      },
    },
    notifications: {
      mealReminders: true,
      waterReminders: true,
      workoutReminders: false,
      weeklyReports: true,
    },
  });

  // Theme state
  const [theme, setTheme] = useState('dark');

  // Sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('trackingData');
    if (savedData) {
      setTrackingData(JSON.parse(savedData));
    }
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save to localStorage whenever trackingData changes
  useEffect(() => {
    localStorage.setItem('trackingData', JSON.stringify(trackingData));
  }, [trackingData]);

  // Save to localStorage whenever userProfile changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Functions to update state
  const updateMeals = (meals) => {
    setTrackingData(prev => ({ ...prev, meals }));
  };

  const updateWaterIntake = (waterIntake) => {
    setTrackingData(prev => ({ ...prev, waterIntake }));
  };

  const updateSteps = (steps) => {
    setTrackingData(prev => ({ ...prev, steps }));
  };

  const updateExercises = (exercises) => {
    setTrackingData(prev => ({ ...prev, exercises }));
  };

  const updateMood = (mood) => {
    setTrackingData(prev => ({ ...prev, mood }));
  };

  const updateNotes = (notes) => {
    setTrackingData(prev => ({ ...prev, notes }));
  };

  const updateGoals = (goals) => {
    setTrackingData(prev => ({ ...prev, goals }));
  };

  // User profile update functions
  const updateUserProfile = (profile) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  const updatePersonalInfo = (personalInfo) => {
    setUserProfile(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...personalInfo } }));
  };

  const updateDietaryPreferences = (dietaryPreferences) => {
    setUserProfile(prev => ({ ...prev, dietaryPreferences: { ...prev.dietaryPreferences, ...dietaryPreferences } }));
  };

  const updateProfileGoals = (goals) => {
    setUserProfile(prev => ({ ...prev, goals: { ...prev.goals, ...goals } }));
  };

  const updateNotifications = (notifications) => {
    setUserProfile(prev => ({ ...prev, notifications: { ...prev.notifications, ...notifications } }));
  };

  // Value object to provide
  const value = {
    trackingData,
    updateMeals,
    updateWaterIntake,
    updateSteps,
    updateExercises,
    updateMood,
    updateNotes,
    updateGoals,
    userProfile,
    updateUserProfile,
    updatePersonalInfo,
    updateDietaryPreferences,
    updateProfileGoals,
    updateNotifications,
    theme,
    setTheme,
    sidebarCollapsed,
    setSidebarCollapsed,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
