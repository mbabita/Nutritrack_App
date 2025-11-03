// MealTracker.js
import React from 'react';

const MealTracker = ({ meals, onAction, onReset }) => {
    const mealsByTime = [
        { title: 'Breakfast', meal: meals.find(m => m.name.includes('Oatmeal')) },
        { title: 'Lunch',  meal: meals.find(m => m.name.includes('Salad')) },
        { title: 'Snacks',  meal: meals.find(m => m.name.includes('Apple')) },
        { title: 'Dinner',  meal: meals.find(m => m.name.includes('Salmon')) },
    ];

    return (
        <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Meal Tracking</h2>
            <p style={styles.sectionSubtitle}>Log your meals for the day. Mark them as "Done" or "Skipped".</p>
            <button style={styles.resetButton} onClick={onReset}>Reset</button>

            <div style={styles.mealsRow}>
                {mealsByTime.map(group => {
                    const meal = group.meal;
                    if (!meal) return null;

                    const isDone = meal.status === 'done';
                    const isSkipped = meal.status === 'skipped';

                    return (
                        <div key={meal.id} style={styles.mealItem}>
                            <div style={styles.mealHeader}>
                                <h3 style={styles.mealTitle}>{group.title}</h3>
                            </div>
                            <div style={styles.mealDetails}>
                                <strong style={styles.mealName}>{meal.name}</strong>
                                <p style={styles.mealCalories}>{meal.calories} kcal</p>
                            </div>
                            <div style={styles.mealActions}>
                                <button
                                    style={isSkipped ? styles.skipButtonDisabled : styles.skipButton}
                                    onClick={() => onAction(meal.id, 'skipped')}
                                    disabled={isDone}
                                >
                                    {isSkipped ? 'Skipped' : 'Skip'}
                                </button>
                                <button
                                    style={isDone ? styles.doneButtonDone : styles.doneButton}
                                    onClick={() => onAction(meal.id, 'done')}
                                    disabled={isSkipped}
                                >
                                    {isDone ? '✅ Done' : 'Done'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    card: {
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        position: 'relative',
        border: '1px solid #e0e0e0',
    },
    mealsRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: '15px',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        color: '#387c53',
        fontSize: '22px',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    sectionSubtitle: {
        color: '#607D8B',
        fontSize: '16px',
        marginBottom: '15px',
        fontStyle: 'italic',
    },
    resetButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#607D8B',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'color 0.3s',
    },
    mealItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        gap: '10px',
        minWidth: '200px',
        flex: '1',
    },
    mealHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },

    mealTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#387c53',
        margin: '0 0 5px 0',
    },
    mealDetails: {
        width: '100%',
        marginBottom: '10px',
    },
    mealCalories: {
        color: '#607D8B',
        fontSize: '14px',
        marginTop: '3px',
    },
    mealActions: {
        display: 'flex',
        gap: '10px',
        width: '100%',
        justifyContent: 'center',
    },
    skipButton: {
        padding: '10px 18px',
        borderRadius: '6px',
        border: '1px solid #FF6B6B',
        background: 'linear-gradient(135deg, #ffffff 0%, #ffebee 100%)',
        color: '#FF6B6B',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s',
    },
    skipButtonDisabled: {
        padding: '10px 18px',
        borderRadius: '6px',
        border: '1px solid #B0BEC5',
        backgroundColor: '#f5f5f5',
        color: '#B0BEC5',
        fontWeight: 'bold',
        cursor: 'not-allowed',
    },
    doneButton: {
        padding: '10px 18px',
        borderRadius: '6px',
        border: 'none',
        background: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s',
        boxShadow: '0 2px 4px rgba(102, 187, 106, 0.3)',
    },
    doneButtonDone: {
        padding: '10px 18px',
        borderRadius: '6px',
        border: 'none',
        background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(76, 175, 80, 0.3)',
    }
};

export default MealTracker;