import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import styles from './StepsTracker.module.css';

const StepsTracker = () => {
    const { trackingData, updateSteps } = useAppContext();
    const { steps, goals } = trackingData;
    const [inputSteps, setInputSteps] = useState('');

    const handleAddSteps = () => {
        const stepsToAdd = parseInt(inputSteps);
        if (!isNaN(stepsToAdd) && stepsToAdd > 0) {
            updateSteps(steps + stepsToAdd);
            setInputSteps('');
        }
    };

    const handleResetSteps = () => {
        updateSteps(0);
    };

    const progressPercentage = Math.min((steps / goals.steps) * 100, 100);

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className={styles.title}>Steps Tracker</h3>
            <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                    <motion.div
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>
                <div className={styles.progressText}>
                    {steps.toLocaleString()} / {goals.steps.toLocaleString()} steps
                </div>
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="number"
                    value={inputSteps}
                    onChange={(e) => setInputSteps(e.target.value)}
                    placeholder="Enter steps"
                    className={styles.input}
                />
                <motion.button
                    onClick={handleAddSteps}
                    className={styles.addButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Add Steps
                </motion.button>
            </div>
            <motion.button
                onClick={handleResetSteps}
                className={styles.resetButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Reset Steps
            </motion.button>
        </motion.div>
    );
};

export default StepsTracker;
