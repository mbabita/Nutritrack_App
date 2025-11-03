import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import MealTracker from './MealTracker';
import WaterTracker from './WaterTracker';
import StepsTracker from './StepsTracker';
import Footer from './Footer';
import ProgressCharts from './ProgressCharts';
import styles from './TrackingPage.module.css';

const TrackingPage = ({ setActiveSection }) => {
    const {
        trackingData,
        updateMeals,
        updateWaterIntake,
        updateExercises,
        updateMood,
        updateNotes,
        updateGoals
    } = useAppContext();

    const { meals, waterIntake, exercises, mood, notes, goals } = trackingData;

    const [reminders, setReminders] = useState([
        { id: 1, name: 'Breakfast time', time: '8:00 AM' },
        { id: 2, name: 'Lunch time', time: '1:00 PM' },
        { id: 3, name: 'Snack time', time: '4:00 PM' },
        { id: 4, name: 'Dinner time', time: '8:00 PM' },
    ]);

    const handleMealAction = (id, action) => {
        const updatedMeals = meals.map(meal =>
            meal.id === id ? { ...meal, status: action } : meal
        );
        updateMeals(updatedMeals);
    };

    const handleResetMeals = () => {
        const resetMeals = meals.map(meal => ({ ...meal, status: 'pending' }));
        updateMeals(resetMeals);
    };

    const handleWaterAdd = (ml) => {
        updateWaterIntake(waterIntake + ml);
    };

    const handleWaterReset = () => {
        updateWaterIntake(0);
    };

    const handleAddExercise = (exercise) => {
        updateExercises([...exercises, exercise]);
    };

    const handleUpdateExercise = (id, updated) => {
        const updatedExercises = exercises.map(ex => ex.id === id ? updated : ex);
        updateExercises(updatedExercises);
    };

    const handleRequestPermission = () => {
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    };

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <button className={styles.backButton} onClick={() => setActiveSection('Dashboard')}>← Back to Dashboard</button>
            <h1 className={styles.pageTitle}>Daily Tracking</h1>
            <p className={styles.pageSubtitle}>Log your meals, water intake, exercise, mood, and stay on top of your goals for today.</p>

            <div className={styles.goalsContainer}>
                <h2>Daily Goals</h2>
                <p>Calories: {meals.filter(m => m.status === 'done').reduce((sum, m) => sum + m.calories, 0)} / {goals.calories}</p>
                <p>Water: {waterIntake}ml / {goals.water}ml</p>
                <p>Steps: {trackingData.steps.toLocaleString()} / {goals.steps.toLocaleString()}</p>
                <p>Meals: {meals.filter(m => m.status === 'done').length} / {goals.meals}</p>
                <p>Skipped: {meals.filter(m => m.status === 'skipped').length} / {goals.meals}</p>
            </div>

            <div className={styles.trackingGrid}>
                <div className={styles.mealAndWaterContainer}>
                    <MealTracker meals={meals} onAction={handleMealAction} onReset={handleResetMeals} />
                    <WaterTracker intake={waterIntake} onAdd={handleWaterAdd} onReset={handleWaterReset} />
                    <StepsTracker />
                    <div className={styles.chartsContainer}>
                        <ProgressCharts meals={meals} exercises={exercises} />
                    </div>
                </div>
            </div>

            <Footer />
        </motion.div>
    );
};



export default TrackingPage;