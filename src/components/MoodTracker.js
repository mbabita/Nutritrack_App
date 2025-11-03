import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

const MoodTracker = ({ mood, notes, onUpdateMood, onUpdateNotes }) => {
    const moods = [
        { value: 'happy', icon: <FaSmile />, label: 'Happy' },
        { value: 'neutral', icon: <FaMeh />, label: 'Neutral' },
        { value: 'sad', icon: <FaFrown />, label: 'Sad' },
    ];

    return (
        <motion.div
            className="mood-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Mood Tracker</h2>
            <p>How are you feeling today?</p>
            <div className="mood-options">
                {moods.map(m => (
                    <button
                        key={m.value}
                        className={`mood-button ${mood === m.value ? 'selected' : ''}`}
                        onClick={() => onUpdateMood(m.value)}
                    >
                        {m.icon} {m.label}
                    </button>
                ))}
            </div>
            <textarea
                placeholder="Add notes about your mood or day..."
                value={notes}
                onChange={(e) => onUpdateNotes(e.target.value)}
                className="notes-textarea"
            />
        </motion.div>
    );
};

export default MoodTracker;
