import React, { useState, useMemo } from 'react';
import Footer from './Footer';

// Categories with symptoms/conditions
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

// Recipe templates by category
const recipesData = {
  'Metabolic Disorders': [
    {
      name: 'Grilled Chicken Salad',
      calories: '350 kcal',
      prepTime: '20 min prep',
      type: 'High-Protein',
      ingredients: ['4 oz grilled chicken breast', '2 cups mixed greens', '1/2 avocado', '1 tomato', '1 tbsp olive oil', 'Lemon juice', 'Salt and pepper'],
      instructions: '1. Grill chicken breast until cooked through. 2. Wash and chop vegetables. 3. Slice avocado. 4. In a bowl, combine greens, chicken, avocado, and tomato. 5. Drizzle with olive oil and lemon juice. 6. Season with salt and pepper. 7. Toss and serve.'
    },
    {
      name: 'Vegetable Stir Fry',
      calories: '280 kcal',
      prepTime: '15 min prep',
      type: 'Vegetarian',
      ingredients: ['1 cup broccoli florets', '1 bell pepper', '1 carrot', '1 zucchini', '1 tbsp olive oil', 'Soy sauce (low-sodium)', 'Garlic'],
      instructions: '1. Wash and chop vegetables. 2. Heat oil in a pan. 3. Add garlic and vegetables. 4. Stir fry for 8-10 minutes. 5. Add low-sodium soy sauce. 6. Serve hot.'
    },
    {
      name: 'Baked Salmon',
      calories: '400 kcal',
      prepTime: '25 min prep',
      type: 'Omega-3 Rich',
      ingredients: ['6 oz salmon fillet', '1 lemon', 'Fresh herbs', '1 tbsp olive oil', 'Salt and pepper'],
      instructions: '1. Preheat oven to 400°F. 2. Place salmon on baking sheet. 3. Drizzle with olive oil and lemon juice. 4. Season with herbs, salt, and pepper. 5. Bake for 15-20 minutes. 6. Serve with steamed vegetables.'
    },
    {
      name: 'Quinoa Bowl',
      calories: '320 kcal',
      prepTime: '20 min prep',
      type: 'Gluten-Free',
      ingredients: ['1 cup cooked quinoa', '1/2 avocado', '1 tomato', '1/2 cucumber', '1 tbsp olive oil', 'Fresh herbs'],
      instructions: '1. Cook quinoa according to package. 2. Chop vegetables. 3. Mix all ingredients in a bowl. 4. Drizzle with olive oil. 5. Garnish with herbs. 6. Serve fresh.'
    },
    {
      name: 'Berry Smoothie',
      calories: '250 kcal',
      prepTime: '5 min prep',
      type: 'Antioxidant-Rich',
      ingredients: ['1 cup mixed berries', '1 banana', '1 cup almond milk', '1 tbsp chia seeds', 'Handful of spinach'],
      instructions: '1. Add all ingredients to blender. 2. Blend until smooth. 3. Pour into glass. 4. Serve immediately.'
    }
  ],
  'Cardiovascular': [
    {
      name: 'Heart-Healthy Oats',
      calories: '300 kcal',
      prepTime: '10 min prep',
      type: 'Fiber-Rich',
      ingredients: ['1/2 cup oats', '1 banana', '1 tbsp almonds', '1 cup low-fat milk', 'Cinnamon'],
      instructions: '1. Cook oats with milk. 2. Top with sliced banana and almonds. 3. Sprinkle cinnamon. 4. Serve warm.'
    },
    {
      name: 'Grilled Turkey Burger',
      calories: '350 kcal',
      prepTime: '15 min prep',
      type: 'Lean Protein',
      ingredients: ['4 oz ground turkey', '1 whole wheat bun', 'Lettuce', 'Tomato', 'Mustard'],
      instructions: '1. Form turkey patty. 2. Grill until cooked. 3. Assemble burger with veggies. 4. Serve on bun.'
    },
    {
      name: 'Mediterranean Salad',
      calories: '280 kcal',
      prepTime: '15 min prep',
      type: 'Olive Oil Based',
      ingredients: ['2 cups mixed greens', '1/2 cucumber', 'Cherry tomatoes', 'Feta cheese', 'Olive oil', 'Oregano'],
      instructions: '1. Chop vegetables. 2. Mix with greens. 3. Add feta. 4. Drizzle olive oil. 5. Season with oregano.'
    },
    {
      name: 'Baked Cod',
      calories: '320 kcal',
      prepTime: '20 min prep',
      type: 'Low-Sodium',
      ingredients: ['6 oz cod fillet', 'Lemon', 'Herbs', '1 tbsp olive oil'],
      instructions: '1. Preheat oven to 375°F. 2. Place cod on foil. 3. Season with lemon and herbs. 4. Bake 15 minutes.'
    },
    {
      name: 'Sweet Potato Mash',
      calories: '250 kcal',
      prepTime: '25 min prep',
      type: 'Potassium-Rich',
      ingredients: ['2 sweet potatoes', '1 tbsp butter', 'Cinnamon', 'Nutmeg'],
      instructions: '1. Bake sweet potatoes. 2. Mash with butter. 3. Season with spices. 4. Serve warm.'
    }
  ],
  'Blood Disorders': [
    {
      name: 'Iron-Rich Spinach Salad',
      calories: '300 kcal',
      prepTime: '15 min prep',
      type: 'Iron-Boosting',
      ingredients: ['2 cups spinach', '4 oz lean beef', '1 tomato', '1 tbsp olive oil', 'Lemon'],
      instructions: '1. Grill beef. 2. Mix with spinach and tomato. 3. Dress with oil and lemon.'
    },
    {
      name: 'Beet Juice',
      calories: '150 kcal',
      prepTime: '10 min prep',
      type: 'Vitamin C Rich',
      ingredients: ['2 beets', '1 carrot', '1 apple', 'Ginger'],
      instructions: '1. Juice all ingredients. 2. Serve chilled.'
    },
    {
      name: 'Lentil Soup',
      calories: '280 kcal',
      prepTime: '30 min prep',
      type: 'Protein-Packed',
      ingredients: ['1 cup lentils', 'Carrots', 'Celery', 'Onion', 'Vegetable broth'],
      instructions: '1. Sauté veggies. 2. Add lentils and broth. 3. Simmer 20 minutes.'
    },
    {
      name: 'Orange Segments',
      calories: '200 kcal',
      prepTime: '5 min prep',
      type: 'Vitamin C Source',
      ingredients: ['2 oranges', 'Mint leaves'],
      instructions: '1. Peel and segment oranges. 2. Garnish with mint.'
    },
    {
      name: 'Honey Lemon Water',
      calories: '100 kcal',
      prepTime: '10 min prep',
      type: 'Hydrating',
      ingredients: ['1 cup water', '1 lemon', '1 tsp honey'],
      instructions: '1. Squeeze lemon into water. 2. Add honey. 3. Stir and serve.'
    }
  ]
};

// Flatten recipesData into an array with id, condition, and description
const recipes = Object.entries(recipesData).flatMap(([condition, recipeList]) =>
  recipeList.map((recipe, index) => ({
    ...recipe,
    id: `${condition}-${index}`,
    condition,
    description: `${recipe.type} recipe suitable for ${condition.toLowerCase()}.`
  }))
);

const RecipesPage = ({ setActiveSection }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCondition = !selectedCondition || recipe.condition === selectedCondition;
      return matchesSearch && matchesCondition;
    });
  }, [searchQuery, selectedCondition]);

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => setActiveSection('Dashboard')}>← Back to Dashboard</button>
      <h1 style={styles.title}>Recipes</h1>
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
        <select
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
          style={styles.dropdown}
        >
          <option value="">All Health Conditions</option>
          {allConditions.map(condition => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>
      </div>
      {selectedRecipe ? (
        <div style={styles.recipeDetail}>
          <button style={styles.backButton} onClick={() => setSelectedRecipe(null)}>← Back to Recipes</button>
          <h2>{selectedRecipe.name}</h2>
          <p style={styles.recipeMeta}>{selectedRecipe.calories} • {selectedRecipe.prepTime}</p>
          <p style={styles.recipeMeta}>{selectedRecipe.condition}</p>
          <p style={styles.recipeMeta}>{selectedRecipe.type}</p>
          <p style={styles.recipeDescription}>{selectedRecipe.description}</p>
          <h3>Ingredients:</h3>
          <ul style={styles.ingredientsList}>
            {selectedRecipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
          </ul>
          <h3>Instructions:</h3>
          <p style={styles.instructions}>{selectedRecipe.instructions}</p>
        </div>
      ) : (
        <div style={styles.recipesGrid}>
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} style={styles.recipeCard} onClick={() => setSelectedRecipe(recipe)}>
              <h3>{recipe.name}</h3>
              <p style={styles.recipeMeta}>{recipe.calories} • {recipe.prepTime}</p>
              <p style={styles.recipeMeta}>{recipe.condition}</p>
              <p style={styles.recipeMeta}>{recipe.type}</p>
              <p style={styles.recipeDescription}>{recipe.description}</p>
            </div>
          ))}
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
  searchBar: {
    flex: 1,
    minWidth: '250px',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '50px',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
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
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
  },
  recipeCard: {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
  },
  recipeCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
  recipeDetail: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  recipeMeta: {
    color: '#cbd5e1',
    fontSize: '14px',
    margin: '5px 0',
  },
  recipeDescription: {
    color: '#cbd5e1',
    fontSize: '16px',
    margin: '15px 0',
  },
  ingredientsList: {
    paddingLeft: '20px',
    margin: '10px 0',
    color: '#cbd5e1',
  },
  instructions: {
    lineHeight: '1.6',
    color: '#cbd5e1',
  },
};

export default RecipesPage;
