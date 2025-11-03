import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import styles from './TodayTasks.module.css';

const TodayTasks = ({ meals, waterIntake }) => {
  const { trackingData } = useAppContext();
  const { goals } = trackingData;
  const pendingMeals = meals.filter(meal => meal.status === 'pending');
  const completedMeals = meals.filter(meal => meal.status === 'done');

  return (
    <div className={styles.container}>
      <h2>Today's Tasks</h2>
      <div className={styles.tasksSection}>
        <h3>Meals to Log ({pendingMeals.length})</h3>
        {pendingMeals.length > 0 ? (
          <ul className={styles.taskList}>
            {pendingMeals.map(meal => (
              <li key={meal.id} className={styles.taskItem}>
                <span className={styles.taskIcon}>{meal.icon}</span>
                <span className={styles.taskName}>{meal.name}</span>
                <span className={styles.taskTime}>{meal.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noTasks}>All meals logged! 🎉</p>
        )}
      </div>
      <div className={styles.tasksSection}>
        <h3>Water Intake</h3>
        <div className={styles.waterProgress}>
          <span>{waterIntake}ml / {goals.water}ml</span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min((waterIntake / goals.water) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.tasksSection}>
        <h3>Completed Today ({completedMeals.length})</h3>
        {completedMeals.length > 0 ? (
          <ul className={styles.taskList}>
            {completedMeals.map(meal => (
              <li key={meal.id} className={styles.completedTask}>
                <span className={styles.taskIcon}>{meal.icon}</span>
                <span className={styles.taskName}>{meal.name}</span>
                <span className={styles.taskTime}>{meal.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noTasks}>No meals completed yet.</p>
        )}
      </div>
    </div>
  );
};

export default TodayTasks;
