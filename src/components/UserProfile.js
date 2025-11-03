import React, { useState, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';
import './UserProfile.module.css';

const UserProfile = () => {
  const { userProfile, updatePersonalInfo, updateDietaryPreferences, updateProfileGoals, updateNotifications } = useAppContext();
  const [activeTab, setActiveTab] = useState('personal');
  const [profilePicture, setProfilePicture] = useState(userProfile.personalInfo.profilePicture || '');
  const fileInputRef = useRef(null);

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const personalInfo = {
      name: formData.get('name'),
      email: formData.get('email'),
      age: formData.get('age'),
      gender: formData.get('gender'),
      height: formData.get('height'),
      weight: formData.get('weight'),
      profilePicture: profilePicture,
    };
    updatePersonalInfo(personalInfo);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture('');
  };

  const handleDietaryPreferencesSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dietaryPreferences = {
      dietType: formData.get('dietType'),
      allergies: formData.get('allergies').split(',').map(item => item.trim()).filter(item => item),
      intolerances: formData.get('intolerances').split(',').map(item => item.trim()).filter(item => item),
      preferredCuisines: formData.get('preferredCuisines').split(',').map(item => item.trim()).filter(item => item),
    };
    updateDietaryPreferences(dietaryPreferences);
  };

  const handleGoalsSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const goals = {
      weightGoal: formData.get('weightGoal'),
      activityLevel: formData.get('activityLevel'),
      weeklyWorkouts: parseInt(formData.get('weeklyWorkouts')) || 0,
      dailyCalories: parseInt(formData.get('dailyCalories')) || 2000,
      macroTargets: {
        protein: parseInt(formData.get('protein')) || 150,
        carbs: parseInt(formData.get('carbs')) || 200,
        fats: parseInt(formData.get('fats')) || 67,
      },
    };
    updateProfileGoals(goals);
  };

  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const notifications = {
      mealReminders: formData.get('mealReminders') === 'on',
      waterReminders: formData.get('waterReminders') === 'on',
      workoutReminders: formData.get('workoutReminders') === 'on',
      weeklyReports: formData.get('weeklyReports') === 'on',
    };
    updateNotifications(notifications);
  };

  return (
    <div className="user-profile">
      <h1>User Profile</h1>

      <div className="profile-tabs">
        <button
          className={activeTab === 'personal' ? 'active' : ''}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button
          className={activeTab === 'dietary' ? 'active' : ''}
          onClick={() => setActiveTab('dietary')}
        >
          Dietary Preferences
        </button>
        <button
          className={activeTab === 'goals' ? 'active' : ''}
          onClick={() => setActiveTab('goals')}
        >
          Goals & Targets
        </button>
        <button
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'personal' && (
          <form onSubmit={handlePersonalInfoSubmit} className="profile-form">
            <h2>Personal Information</h2>

            {/* Profile Picture Section */}
            <div className="form-group profile-picture-group">
              <label>Profile Picture:</label>
              <div className="profile-picture-container">
                {profilePicture ? (
                  <div className="profile-picture-preview">
                    <img src={profilePicture} alt="Profile" className="profile-picture-img" />
                    <button type="button" onClick={handleRemovePicture} className="remove-picture-btn">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="profile-picture-placeholder">
                    <span>No picture selected</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="upload-picture-btn"
                >
                  {profilePicture ? 'Change Picture' : 'Upload Picture'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={userProfile.personalInfo.name}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={userProfile.personalInfo.email}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                defaultValue={userProfile.personalInfo.age}
                min="1"
                max="120"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                defaultValue={userProfile.personalInfo.gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="height">Height (cm):</label>
              <input
                type="number"
                id="height"
                name="height"
                defaultValue={userProfile.personalInfo.height}
                min="50"
                max="250"
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (kg):</label>
              <input
                type="number"
                id="weight"
                name="weight"
                defaultValue={userProfile.personalInfo.weight}
                min="20"
                max="300"
                step="0.1"
              />
            </div>

            {/* BMI Calculator */}
            {userProfile.personalInfo.height && userProfile.personalInfo.weight && (
              <div className="form-group bmi-display">
                <label>BMI:</label>
                <span className="bmi-value">
                  {(userProfile.personalInfo.weight / ((userProfile.personalInfo.height / 100) ** 2)).toFixed(1)}
                </span>
                <span className="bmi-category">
                  {(() => {
                    const bmi = userProfile.personalInfo.weight / ((userProfile.personalInfo.height / 100) ** 2);
                    if (bmi < 18.5) return ' (Underweight)';
                    if (bmi < 25) return ' (Normal)';
                    if (bmi < 30) return ' (Overweight)';
                    return ' (Obese)';
                  })()}
                </span>
              </div>
            )}

            <button type="submit" className="save-button">Save Personal Info</button>
          </form>
        )}

        {activeTab === 'dietary' && (
          <form onSubmit={handleDietaryPreferencesSubmit} className="profile-form">
            <h2>Dietary Preferences</h2>
            <div className="form-group">
              <label htmlFor="dietType">Diet Type:</label>
              <select
                id="dietType"
                name="dietType"
                defaultValue={userProfile.dietaryPreferences.dietType}
              >
                <option value="">Select Diet Type</option>
                <option value="omnivore">Omnivore</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="low-carb">Low Carb</option>
                <option value="gluten-free">Gluten Free</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="allergies">Allergies (comma-separated):</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                defaultValue={userProfile.dietaryPreferences.allergies.join(', ')}
                placeholder="e.g., nuts, dairy, shellfish"
              />
            </div>
            <div className="form-group">
              <label htmlFor="intolerances">Intolerances (comma-separated):</label>
              <input
                type="text"
                id="intolerances"
                name="intolerances"
                defaultValue={userProfile.dietaryPreferences.intolerances.join(', ')}
                placeholder="e.g., lactose, gluten"
              />
            </div>
            <div className="form-group">
              <label htmlFor="preferredCuisines">Preferred Cuisines (comma-separated):</label>
              <input
                type="text"
                id="preferredCuisines"
                name="preferredCuisines"
                defaultValue={userProfile.dietaryPreferences.preferredCuisines.join(', ')}
                placeholder="e.g., Italian, Mexican, Asian"
              />
            </div>
            <button type="submit" className="save-button">Save Dietary Preferences</button>
          </form>
        )}

        {activeTab === 'goals' && (
          <form onSubmit={handleGoalsSubmit} className="profile-form">
            <h2>Goals & Targets</h2>
            <div className="form-group">
              <label htmlFor="weightGoal">Weight Goal:</label>
              <select
                id="weightGoal"
                name="weightGoal"
                defaultValue={userProfile.goals.weightGoal}
              >
                <option value="">Select Weight Goal</option>
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="activityLevel">Activity Level:</label>
              <select
                id="activityLevel"
                name="activityLevel"
                defaultValue={userProfile.goals.activityLevel}
              >
                <option value="">Select Activity Level</option>
                <option value="sedentary">Sedentary</option>
                <option value="lightly-active">Lightly Active</option>
                <option value="moderately-active">Moderately Active</option>
                <option value="very-active">Very Active</option>
                <option value="extremely-active">Extremely Active</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="weeklyWorkouts">Weekly Workouts:</label>
              <input
                type="number"
                id="weeklyWorkouts"
                name="weeklyWorkouts"
                defaultValue={userProfile.goals.weeklyWorkouts}
                min="0"
                max="14"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dailyCalories">Daily Calorie Target:</label>
              <input
                type="number"
                id="dailyCalories"
                name="dailyCalories"
                defaultValue={userProfile.goals.dailyCalories}
                min="800"
                max="5000"
              />
            </div>
            <h3>Macro Targets (grams)</h3>
            <div className="form-group">
              <label htmlFor="protein">Protein:</label>
              <input
                type="number"
                id="protein"
                name="protein"
                defaultValue={userProfile.goals.macroTargets.protein}
                min="0"
                max="500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="carbs">Carbohydrates:</label>
              <input
                type="number"
                id="carbs"
                name="carbs"
                defaultValue={userProfile.goals.macroTargets.carbs}
                min="0"
                max="1000"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fats">Fats:</label>
              <input
                type="number"
                id="fats"
                name="fats"
                defaultValue={userProfile.goals.macroTargets.fats}
                min="0"
                max="200"
              />
            </div>
            <button type="submit" className="save-button">Save Goals</button>
          </form>
        )}

        {activeTab === 'notifications' && (
          <form onSubmit={handleNotificationsSubmit} className="profile-form">
            <h2>Notification Preferences</h2>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="mealReminders"
                  defaultChecked={userProfile.notifications.mealReminders}
                />
                Meal Reminders
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="waterReminders"
                  defaultChecked={userProfile.notifications.waterReminders}
                />
                Water Intake Reminders
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="workoutReminders"
                  defaultChecked={userProfile.notifications.workoutReminders}
                />
                Workout Reminders
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="weeklyReports"
                  defaultChecked={userProfile.notifications.weeklyReports}
                />
                Weekly Progress Reports
              </label>
            </div>
            <button type="submit" className="save-button">Save Notification Preferences</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
