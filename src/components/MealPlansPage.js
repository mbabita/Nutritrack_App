import React, { useState } from 'react';
import Footer from './Footer';

// Import categories from RecipesPage or define here
const categories = {
  'Metabolic Disorders': ['Diabetes', 'Obesity', 'Thyroid Issues', 'PCOS'],
  'Cardiovascular': ['Hypertension', 'Heart Disease', 'Stroke Recovery'],
  'Blood Disorders': ['Anemia', 'Hemorrhoids', 'Varicose Veins', 'Edema'],
  'Bone & Joint': ['Osteoporosis', 'Arthritis', 'Rheumatoid Arthritis', 'Gout'],
  'Respiratory': ['Asthma', 'Pneumonia', 'Bronchitis', 'Sinusitis', 'Tonsillitis'],
  'Digestive': ['IBS', 'GERD', 'Celiac Disease', 'Lactose Intolerance', 'Gallstones', 'Pancreatitis', 'Colitis', 'Diverticulitis'],
  'Mental Health': ['Depression', 'Anxiety', 'Insomnia', 'Migraine'],
  'Skin Conditions': ['Allergies', 'Psoriasis', 'Eczema', 'Acne', 'Rosacea', 'Dermatitis', 'Cellulitis', 'Impetigo', 'Scabies', 'Ringworm', 'Athlete\'s Foot', 'Nail Fungus'],
  'Neurological': ['Multiple Sclerosis', 'Parkinson\'s', 'Alzheimer\'s', 'Epilepsy'],
  'Infectious Diseases': ['HIV/AIDS', 'Tuberculosis', 'Pharyngitis', 'Laryngitis', 'Otitis Media', 'Conjunctivitis'],
  'Reproductive': ['Endometriosis'],
  'Kidney & Liver': ['Kidney Disease', 'Liver Disease'],
  'Autoimmune': ['Lupus']
};

const allConditions = Object.values(categories).flat();

// Empty meal plans data
const mealPlans = {};

const MealPlansPage = ({ setActiveSection }) => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [selectedDay, setSelectedDay] = useState(null);

  const plan = selectedCondition && mealPlans[selectedCondition] ? mealPlans[selectedCondition][selectedDuration] : [];

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => setActiveSection('Dashboard')}>← Back to Dashboard</button>
      <h1 style={styles.title}>My Meal Plans</h1>
      <div style={styles.filters}>
        <select
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
          style={styles.dropdown}
        >
          <option value="">Select Health Condition</option>
          {allConditions.map(condition => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>
        <select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
          style={styles.dropdown}
        >
          <option value={15}>15 Days</option>
          <option value={30}>30 Days</option>
          <option value={60}>60 Days</option>
        </select>
      </div>
      {selectedCondition && plan.length === 0 && (
        <p style={styles.noPlans}>No meal plans available for the selected condition and duration.</p>
      )}
      {selectedCondition && plan.length > 0 && (
        <div style={styles.planContainer}>
          <h2>Plan for {selectedCondition} - {selectedDuration} Days</h2>
          <div style={styles.daysGrid}>
            {plan.map(day => (
              <div key={day.day} style={styles.dayCard} onClick={() => setSelectedDay(day)}>
                <h3>Day {day.day}</h3>
                <p>Breakfast: {day.meals.breakfast}</p>
                <p>Lunch: {day.meals.lunch}</p>
                <p>Dinner: {day.meals.dinner}</p>
                <p>Snack: {day.meals.snack}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedDay && (
        <div style={styles.dayDetail}>
          <button style={styles.backButton} onClick={() => setSelectedDay(null)}>← Back to Plan</button>
          <h2>Day {selectedDay.day} Details</h2>
          <ul style={styles.mealsList}>
            <li><strong>Breakfast:</strong> {selectedDay.meals.breakfast}</li>
            <li><strong>Lunch:</strong> {selectedDay.meals.lunch}</li>
            <li><strong>Dinner:</strong> {selectedDay.meals.dinner}</li>
            <li><strong>Snack:</strong> {selectedDay.meals.snack}</li>
          </ul>
        </div>
      )}

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
  backButton: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    color: '#3b82f6',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
    padding: '10px 20px',
    borderRadius: '50px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  title: {
    color: '#ffffff',
    marginBottom: '30px',
    fontSize: '2.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  },
  filters: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  dropdown: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '50px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    outline: 'none',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  },
  noPlans: {
    textAlign: 'center',
    color: '#cbd5e1',
    fontSize: '18px',
    marginTop: '50px',
  },
  planContainer: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  dayCard: {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '15px',
    background: 'rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  dayDetail: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  mealsList: {
    paddingLeft: '20px',
    lineHeight: '1.8',
    color: '#cbd5e1',
  },
};

export default MealPlansPage;
