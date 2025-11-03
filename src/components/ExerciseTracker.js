import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell } from 'react-icons/fa';

const ExerciseTracker = ({ exercises, onAddExercise, onUpdateExercise }) => {
    const [newExercise, setNewExercise] = useState({ type: '', duration: '', calories: '' });

    const handleAdd = () => {
        if (newExercise.type && newExercise.duration) {
            onAddExercise({ ...newExercise, id: Date.now() });
            setNewExercise({ type: '', duration: '', calories: '' });
        }
    };

    return (
        <motion.div
            className="exercise-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2><FaDumbbell /> Exercise Tracker</h2>
            <p>Log your workouts for today.</p>
            <div className="exercise-list">
                {exercises.map(ex => (
                    <div key={ex.id} className="exercise-item">
                        <span>{ex.type} - {ex.duration} min - {ex.calories} cal</span>
                        <button onClick={() => onUpdateExercise(ex.id, { ...ex, completed: !ex.completed })}>
                            {ex.completed ? '✅' : 'Mark Done'}
                        </button>
                    </div>
                ))}
            </div>
            <div className="add-exercise">
                <input
                    type="text"
                    placeholder="Exercise type"
                    value={newExercise.type}
                    onChange={(e) => setNewExercise({ ...newExercise, type: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Duration (min)"
                    value={newExercise.duration}
                    onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Calories burned"
                    value={newExercise.calories}
                    onChange={(e) => setNewExercise({ ...newExercise, calories: e.target.value })}
                />
                <button onClick={handleAdd}>Add Exercise</button>
            </div>
        </motion.div>
    );
};

export default ExerciseTracker;
