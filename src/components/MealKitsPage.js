import React, { useState } from 'react';
import Footer from './Footer';

// Meal kits data for different goals
const mealKits = {
  'Weight Loss': {
    15: Array.from({ length: 15 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Oatmeal with berries', nutrition: { calories: 250, protein: 8, carbs: 45, fats: 5 }, recipe: { ingredients: ['1/2 cup oats', '1 cup berries', '1 cup almond milk', '1 tbsp honey'], instructions: 'Mix oats and almond milk, microwave for 2 minutes, top with berries and honey.' } },
        lunch: { name: 'Grilled chicken salad', nutrition: { calories: 350, protein: 30, carbs: 15, fats: 15 }, recipe: { ingredients: ['4oz grilled chicken breast', '2 cups mixed greens', '1/2 cup cherry tomatoes', '1/2 cucumber', '2 tbsp olive oil dressing'], instructions: 'Grill chicken, slice, toss with greens, tomatoes, cucumber, and dressing.' } },
        dinner: { name: 'Baked salmon with veggies', nutrition: { calories: 400, protein: 35, carbs: 20, fats: 20 }, recipe: { ingredients: ['6oz salmon fillet', '1 cup broccoli', '1 cup carrots', '1 tbsp olive oil', '1 lemon'], instructions: 'Preheat oven to 400F, bake salmon for 15 min, steam veggies.' } },
        snack: { name: 'Greek yogurt', nutrition: { calories: 150, protein: 15, carbs: 10, fats: 5 }, recipe: { ingredients: ['1 cup plain Greek yogurt', '1/2 cup mixed berries'], instructions: 'Mix yogurt with berries.' } }
      }
    })),
    30: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Green smoothie', nutrition: { calories: 200, protein: 5, carbs: 35, fats: 3 }, recipe: { ingredients: ['1 banana', '1 cup spinach', '1 cup almond milk', '1 tbsp chia seeds'], instructions: 'Blend all ingredients until smooth.' } },
        lunch: { name: 'Quinoa bowl', nutrition: { calories: 400, protein: 15, carbs: 60, fats: 10 }, recipe: { ingredients: ['1/2 cup cooked quinoa', '1/2 cup chickpeas', '1/2 cup cucumber', '1/4 avocado', 'lemon juice'], instructions: 'Mix quinoa, chickpeas, cucumber, avocado, drizzle lemon juice.' } },
        dinner: { name: 'Turkey stir-fry', nutrition: { calories: 350, protein: 40, carbs: 25, fats: 12 }, recipe: { ingredients: ['4oz ground turkey', '1 cup mixed veggies', '1 tbsp soy sauce', '1 tsp ginger'], instructions: 'Stir-fry turkey and veggies, add soy and ginger.' } },
        snack: { name: 'Apple with almonds', nutrition: { calories: 180, protein: 5, carbs: 25, fats: 10 }, recipe: { ingredients: ['1 apple', '10 almonds'], instructions: 'Eat apple with almonds.' } }
      }
    })),
    60: Array.from({ length: 60 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Egg white omelette', nutrition: { calories: 150, protein: 20, carbs: 5, fats: 5 }, recipe: { ingredients: ['4 egg whites', '1/2 cup spinach', '1/2 tomato', 'salt and pepper'], instructions: 'Whisk egg whites, cook in pan with spinach and tomato.' } },
        lunch: { name: 'Mixed greens salad', nutrition: { calories: 250, protein: 10, carbs: 20, fats: 15 }, recipe: { ingredients: ['2 cups mixed greens', '1/2 cucumber', '1/2 cup cherry tomatoes', '2 tbsp vinaigrette'], instructions: 'Toss greens, cucumber, tomatoes with vinaigrette.' } },
        dinner: { name: 'Grilled fish', nutrition: { calories: 300, protein: 35, carbs: 10, fats: 15 }, recipe: { ingredients: ['6oz white fish', '1 cup zucchini', '1 tbsp olive oil', 'herbs'], instructions: 'Grill fish, sauté zucchini with oil and herbs.' } },
        snack: { name: 'Carrot sticks', nutrition: { calories: 50, protein: 1, carbs: 12, fats: 0 }, recipe: { ingredients: ['4 carrot sticks'], instructions: 'Eat as is.' } }
      }
    }))
  },
  'Weight Gain': {
    15: Array.from({ length: 15 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Avocado toast with eggs', nutrition: { calories: 450, protein: 18, carbs: 35, fats: 25 }, recipe: { ingredients: ['2 slices whole grain bread', '1 avocado', '2 eggs', 'salt'], instructions: 'Toast bread, mash avocado on top, fry eggs and place on top.' } },
        lunch: { name: 'Chicken sandwich', nutrition: { calories: 550, protein: 35, carbs: 45, fats: 20 }, recipe: { ingredients: ['4oz chicken breast', '2 slices bread', 'lettuce', 'tomato', 'mayo'], instructions: 'Grill chicken, assemble sandwich with bread, lettuce, tomato, mayo.' } },
        dinner: { name: 'Pasta with meat sauce', nutrition: { calories: 700, protein: 40, carbs: 80, fats: 25 }, recipe: { ingredients: ['1 cup pasta', '4oz ground beef', '1/2 cup tomato sauce', 'onion', 'garlic'], instructions: 'Cook pasta, brown beef with onion and garlic, add sauce, mix.' } },
        snack: { name: 'Peanut butter banana', nutrition: { calories: 350, protein: 10, carbs: 40, fats: 20 }, recipe: { ingredients: ['1 banana', '2 tbsp peanut butter'], instructions: 'Spread peanut butter on banana.' } }
      }
    })),
    30: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Smoothie with protein', nutrition: { calories: 500, protein: 30, carbs: 50, fats: 15 }, recipe: { ingredients: ['1 banana', '1 scoop protein powder', '1 cup milk', '1 tbsp peanut butter'], instructions: 'Blend all ingredients.' } },
        lunch: { name: 'Rice and beans', nutrition: { calories: 600, protein: 25, carbs: 90, fats: 10 }, recipe: { ingredients: ['1 cup rice', '1 cup beans', '1/2 cup cheese', 'salsa'], instructions: 'Cook rice and beans, top with cheese and salsa.' } },
        dinner: { name: 'Steak with potatoes', nutrition: { calories: 750, protein: 50, carbs: 60, fats: 35 }, recipe: { ingredients: ['6oz steak', '2 potatoes', 'butter', 'garlic'], instructions: 'Grill steak, bake potatoes with butter and garlic.' } },
        snack: { name: 'Trail mix', nutrition: { calories: 400, protein: 12, carbs: 30, fats: 25 }, recipe: { ingredients: ['1/2 cup nuts', '1/2 cup dried fruit', '1/4 cup chocolate chips'], instructions: 'Mix all ingredients.' } }
      }
    })),
    60: Array.from({ length: 60 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Pancakes with syrup', nutrition: { calories: 600, protein: 15, carbs: 80, fats: 20 }, recipe: { ingredients: ['1 cup flour', '1 cup milk', '2 eggs', 'syrup'], instructions: 'Mix flour, milk, eggs, cook pancakes, top with syrup.' } },
        lunch: { name: 'Burger and fries', nutrition: { calories: 800, protein: 35, carbs: 70, fats: 40 }, recipe: { ingredients: ['4oz beef patty', 'bun', 'fries', 'cheese'], instructions: 'Grill patty, assemble burger, fry potatoes.' } },
        dinner: { name: 'Pizza night', nutrition: { calories: 900, protein: 40, carbs: 85, fats: 35 }, recipe: { ingredients: ['pizza dough', '1 cup cheese', 'pepperoni', 'sauce'], instructions: 'Top dough with sauce, cheese, pepperoni, bake at 450F for 15 min.' } },
        snack: { name: 'Cheese and crackers', nutrition: { calories: 300, protein: 10, carbs: 25, fats: 18 }, recipe: { ingredients: ['4 crackers', '2oz cheese'], instructions: 'Spread cheese on crackers.' } }
      }
    }))
  },
  'Bridal Glow': {
    15: Array.from({ length: 15 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Fruit salad', nutrition: { calories: 200, protein: 3, carbs: 45, fats: 2 }, recipe: { ingredients: ['1 apple', '1 orange', '1 cup berries', '1 tbsp honey'], instructions: 'Chop fruits, mix with honey.' } },
        lunch: { name: 'Veggie wrap', nutrition: { calories: 350, protein: 12, carbs: 50, fats: 10 }, recipe: { ingredients: ['whole wheat tortilla', 'lettuce', 'cucumber', 'carrot', 'hummus'], instructions: 'Spread hummus on tortilla, add veggies, roll.' } },
        dinner: { name: 'Herb chicken', nutrition: { calories: 400, protein: 35, carbs: 15, fats: 18 }, recipe: { ingredients: ['4oz chicken breast', 'rosemary', 'thyme', 'olive oil'], instructions: 'Season chicken with herbs, bake at 375F for 20 min.' } },
        snack: { name: 'Nuts and seeds', nutrition: { calories: 250, protein: 8, carbs: 10, fats: 20 }, recipe: { ingredients: ['1/4 cup almonds', '1/4 cup pumpkin seeds'], instructions: 'Mix and eat.' } }
      }
    })),
    30: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Yogurt parfait', nutrition: { calories: 300, protein: 15, carbs: 40, fats: 8 }, recipe: { ingredients: ['1 cup yogurt', '1/2 cup granola', 'berries'], instructions: 'Layer yogurt, granola, berries.' } },
        lunch: { name: 'Salmon salad', nutrition: { calories: 450, protein: 30, carbs: 20, fats: 25 }, recipe: { ingredients: ['4oz salmon', 'mixed greens', 'avocado', 'lemon dressing'], instructions: 'Grill salmon, toss with greens and avocado, dress.' } },
        dinner: { name: 'Quinoa stir-fry', nutrition: { calories: 500, protein: 20, carbs: 60, fats: 15 }, recipe: { ingredients: ['1/2 cup quinoa', 'veggies', 'tofu', 'soy sauce'], instructions: 'Cook quinoa, stir-fry veggies and tofu with soy.' } },
        snack: { name: 'Dark chocolate', nutrition: { calories: 150, protein: 2, carbs: 15, fats: 10 }, recipe: { ingredients: ['2oz dark chocolate'], instructions: 'Eat chocolate.' } }
      }
    })),
    60: Array.from({ length: 60 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Smoothie bowl', nutrition: { calories: 350, protein: 10, carbs: 55, fats: 12 }, recipe: { ingredients: ['1 banana', '1 cup berries', '1 cup yogurt', 'chia seeds'], instructions: 'Blend, pour into bowl, top with seeds.' } },
        lunch: { name: 'Mediterranean bowl', nutrition: { calories: 500, protein: 20, carbs: 65, fats: 18 }, recipe: { ingredients: ['1/2 cup rice', 'chickpeas', 'cucumber', 'tahini'], instructions: 'Mix rice, chickpeas, cucumber, drizzle tahini.' } },
        dinner: { name: 'Grilled veggies', nutrition: { calories: 300, protein: 8, carbs: 40, fats: 15 }, recipe: { ingredients: ['zucchini', 'bell peppers', 'olive oil', 'herbs'], instructions: 'Grill veggies with oil and herbs.' } },
        snack: { name: 'Fresh fruit', nutrition: { calories: 100, protein: 1, carbs: 25, fats: 0 }, recipe: { ingredients: ['1 orange'], instructions: 'Peel and eat.' } }
      }
    }))
  },
  'Maintenance': {
    15: Array.from({ length: 15 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Cereal with milk', nutrition: { calories: 300, protein: 10, carbs: 50, fats: 5 }, recipe: { ingredients: ['1 cup cereal', '1 cup milk'], instructions: 'Pour milk over cereal.' } },
        lunch: { name: 'Sandwich', nutrition: { calories: 450, protein: 20, carbs: 45, fats: 15 }, recipe: { ingredients: ['2 slices bread', 'turkey', 'cheese', 'lettuce'], instructions: 'Assemble sandwich.' } },
        dinner: { name: 'Pasta', nutrition: { calories: 550, protein: 18, carbs: 75, fats: 12 }, recipe: { ingredients: ['1 cup pasta', '1/2 cup sauce'], instructions: 'Cook pasta, add sauce.' } },
        snack: { name: 'Yogurt', nutrition: { calories: 150, protein: 12, carbs: 15, fats: 4 }, recipe: { ingredients: ['1 cup yogurt'], instructions: 'Eat yogurt.' } }
      }
    })),
    30: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Toast with jam', nutrition: { calories: 250, protein: 5, carbs: 45, fats: 3 }, recipe: { ingredients: ['2 slices toast', 'jam'], instructions: 'Spread jam on toast.' } },
        lunch: { name: 'Soup and salad', nutrition: { calories: 350, protein: 15, carbs: 40, fats: 10 }, recipe: { ingredients: ['1 cup soup', 'salad greens', 'dressing'], instructions: 'Serve soup with salad.' } },
        dinner: { name: 'Grilled meat', nutrition: { calories: 500, protein: 40, carbs: 20, fats: 25 }, recipe: { ingredients: ['6oz meat', 'veggies'], instructions: 'Grill meat and veggies.' } },
        snack: { name: 'Fruit', nutrition: { calories: 80, protein: 1, carbs: 20, fats: 0 }, recipe: { ingredients: ['1 apple'], instructions: 'Eat apple.' } }
      }
    })),
    60: Array.from({ length: 60 }, (_, i) => ({
      day: i + 1,
      meals: {
        breakfast: { name: 'Omelette', nutrition: { calories: 350, protein: 25, carbs: 5, fats: 20 }, recipe: { ingredients: ['2 eggs', 'cheese', 'veggies'], instructions: 'Make omelette with cheese and veggies.' } },
        lunch: { name: 'Wrap', nutrition: { calories: 400, protein: 20, carbs: 40, fats: 15 }, recipe: { ingredients: ['tortilla', 'chicken', 'veggies'], instructions: 'Fill tortilla with chicken and veggies.' } },
        dinner: { name: 'Stir-fry', nutrition: { calories: 450, protein: 25, carbs: 50, fats: 15 }, recipe: { ingredients: ['veggies', 'protein', 'sauce'], instructions: 'Stir-fry veggies and protein with sauce.' } },
        snack: { name: 'Cheese stick', nutrition: { calories: 100, protein: 7, carbs: 1, fats: 8 }, recipe: { ingredients: ['1 cheese stick'], instructions: 'Eat cheese stick.' } }
      }
    }))
  }
};

const goals = Object.keys(mealKits);

const MealKitsPage = ({ setActiveSection }) => {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [selectedDay, setSelectedDay] = useState(null);

  const plan = selectedGoal && mealKits[selectedGoal] ? mealKits[selectedGoal][selectedDuration] : [];

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => setActiveSection('Dashboard')}>← Back to Dashboard</button>
      <h1 style={styles.title}>Meal Kits</h1>
      <div style={styles.filters}>
        <select
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
          style={styles.dropdown}
        >
          <option value="">Select Goal</option>
          {goals.map(goal => (
            <option key={goal} value={goal}>{goal}</option>
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
      {selectedGoal && (
        <div style={styles.planContainer}>
          <h2>{selectedGoal} Plan - {selectedDuration} Days</h2>
          <div style={styles.daysGrid}>
            {plan.map(day => {
              const totalCalories = Object.values(day.meals).reduce((sum, meal) => sum + meal.nutrition.calories, 0);
              const totalProtein = Object.values(day.meals).reduce((sum, meal) => sum + meal.nutrition.protein, 0);
              const totalCarbs = Object.values(day.meals).reduce((sum, meal) => sum + meal.nutrition.carbs, 0);
              const totalFats = Object.values(day.meals).reduce((sum, meal) => sum + meal.nutrition.fats, 0);

              return (
                <div key={day.day} style={styles.dayCard} onClick={() => setSelectedDay(day)}>
                  <h3>Day {day.day}</h3>
                  <div style={styles.nutritionSummary}>
                    <span style={styles.calories}>{totalCalories} cal</span>
                    <span style={styles.macros}>P: {totalProtein}g | C: {totalCarbs}g | F: {totalFats}g</span>
                  </div>
                  <p>Breakfast: {day.meals.breakfast.name}</p>
                  <p>Lunch: {day.meals.lunch.name}</p>
                  <p>Dinner: {day.meals.dinner.name}</p>
                  <p>Snack: {day.meals.snack.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedDay && (
        <div style={styles.dayDetail}>
          <button style={styles.backButton} onClick={() => setSelectedDay(null)}>← Back to Plan</button>
          <h2>Day {selectedDay.day} Details</h2>
          <div style={styles.dayNutrition}>
            <h3>Daily Nutrition Summary</h3>
            <div style={styles.nutritionGrid}>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionValue}>{Object.values(selectedDay.meals).reduce((sum, meal) => sum + meal.nutrition.calories, 0)}</span>
                <span style={styles.nutritionLabel}>Calories</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionValue}>{Object.values(selectedDay.meals).reduce((sum, meal) => sum + meal.nutrition.protein, 0)}g</span>
                <span style={styles.nutritionLabel}>Protein</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionValue}>{Object.values(selectedDay.meals).reduce((sum, meal) => sum + meal.nutrition.carbs, 0)}g</span>
                <span style={styles.nutritionLabel}>Carbs</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionValue}>{Object.values(selectedDay.meals).reduce((sum, meal) => sum + meal.nutrition.fats, 0)}g</span>
                <span style={styles.nutritionLabel}>Fats</span>
              </div>
            </div>
          </div>
          <ul style={styles.mealsList}>
            <li>
              <strong>Breakfast:</strong> {selectedDay.meals.breakfast.name}
              <div style={styles.mealNutrition}>
                {selectedDay.meals.breakfast.nutrition.calories} cal | P: {selectedDay.meals.breakfast.nutrition.protein}g | C: {selectedDay.meals.breakfast.nutrition.carbs}g | F: {selectedDay.meals.breakfast.nutrition.fats}g
              </div>
              {selectedDay.meals.breakfast.recipe && (
                <div style={styles.recipe}>
                  <h4>Recipe</h4>
                  <div style={styles.ingredients}>
                    <strong>Ingredients:</strong>
                    <ul>
                      {selectedDay.meals.breakfast.recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={styles.instructions}>
                    <strong>Instructions:</strong> {selectedDay.meals.breakfast.recipe.instructions}
                  </div>
                </div>
              )}
            </li>
            <li>
              <strong>Lunch:</strong> {selectedDay.meals.lunch.name}
              <div style={styles.mealNutrition}>
                {selectedDay.meals.lunch.nutrition.calories} cal | P: {selectedDay.meals.lunch.nutrition.protein}g | C: {selectedDay.meals.lunch.nutrition.carbs}g | F: {selectedDay.meals.lunch.nutrition.fats}g
              </div>
              {selectedDay.meals.lunch.recipe && (
                <div style={styles.recipe}>
                  <h4>Recipe</h4>
                  <div style={styles.ingredients}>
                    <strong>Ingredients:</strong>
                    <ul>
                      {selectedDay.meals.lunch.recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={styles.instructions}>
                    <strong>Instructions:</strong> {selectedDay.meals.lunch.recipe.instructions}
                  </div>
                </div>
              )}
            </li>
            <li>
              <strong>Dinner:</strong> {selectedDay.meals.dinner.name}
              <div style={styles.mealNutrition}>
                {selectedDay.meals.dinner.nutrition.calories} cal | P: {selectedDay.meals.dinner.nutrition.protein}g | C: {selectedDay.meals.dinner.nutrition.carbs}g | F: {selectedDay.meals.dinner.nutrition.fats}g
              </div>
              {selectedDay.meals.dinner.recipe && (
                <div style={styles.recipe}>
                  <h4>Recipe</h4>
                  <div style={styles.ingredients}>
                    <strong>Ingredients:</strong>
                    <ul>
                      {selectedDay.meals.dinner.recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={styles.instructions}>
                    <strong>Instructions:</strong> {selectedDay.meals.dinner.recipe.instructions}
                  </div>
                </div>
              )}
            </li>
            <li>
              <strong>Snack:</strong> {selectedDay.meals.snack.name}
              <div style={styles.mealNutrition}>
                {selectedDay.meals.snack.nutrition.calories} cal | P: {selectedDay.meals.snack.nutrition.protein}g | C: {selectedDay.meals.snack.nutrition.carbs}g | F: {selectedDay.meals.snack.nutrition.fats}g
              </div>
              {selectedDay.meals.snack.recipe && (
                <div style={styles.recipe}>
                  <h4>Recipe</h4>
                  <div style={styles.ingredients}>
                    <strong>Ingredients:</strong>
                    <ul>
                      {selectedDay.meals.snack.recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={styles.instructions}>
                    <strong>Instructions:</strong> {selectedDay.meals.snack.recipe.instructions}
                  </div>
                </div>
              )}
            </li>
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
  nutritionSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  calories: {
    color: '#3b82f6',
    fontSize: '16px',
  },
  macros: {
    color: '#cbd5e1',
    fontSize: '12px',
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
  dayNutrition: {
    marginBottom: '20px',
  },
  nutritionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    marginTop: '10px',
  },
  nutritionItem: {
    textAlign: 'center',
    padding: '10px',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '8px',
  },
  nutritionValue: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  nutritionLabel: {
    fontSize: '12px',
    color: '#cbd5e1',
  },
  mealNutrition: {
    fontSize: '12px',
    color: '#cbd5e1',
    marginTop: '5px',
  },
  recipe: {
    marginTop: '10px',
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  ingredients: {
    marginBottom: '10px',
  },
  instructions: {
    fontSize: '14px',
    color: '#cbd5e1',
  },
};

export default MealKitsPage;
