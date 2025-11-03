import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressCharts = ({ meals, exercises }) => {
    const mealData = meals.map(m => ({ name: m.name, calories: m.calories, completed: m.status === 'done' }));
    const exerciseData = exercises.map(e => ({ name: e.type, duration: e.duration }));

    return (
        <motion.div
            className="charts-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Current Reading</h2>
            <div className="chart-container">
                <h3>Meal Calories</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={mealData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="calories" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {exerciseData.length > 0 && (
                <div className="chart-container">
                    <h3>Exercise Duration</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={exerciseData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="duration" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </motion.div>
    );
};

export default ProgressCharts;
