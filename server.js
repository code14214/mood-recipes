const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('recipes.db');

// Initialize database with tables and sample data
db.serialize(() => {
  // Create recipes table
  db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    mood TEXT NOT NULL,
    prep_time INTEGER,
    difficulty TEXT
  )`);

  // Insert sample recipes for different moods
  const sampleRecipes = [
    {
      name: "Comforting Mac and Cheese",
      ingredients: "Macaroni, cheddar cheese, milk, butter, flour, breadcrumbs",
      instructions: "1. Cook macaroni\n2. Make cheese sauce\n3. Combine and bake",
      mood: "sad",
      prep_time: 30,
      difficulty: "easy"
    },
    {
      name: "Energizing Smoothie Bowl",
      ingredients: "Banana, berries, yogurt, granola, honey, chia seeds",
      instructions: "1. Blend fruits with yogurt\n2. Top with granola and seeds",
      mood: "happy",
      prep_time: 10,
      difficulty: "easy"
    },
    {
      name: "Spicy Chicken Tacos",
      ingredients: "Chicken, tortillas, spices, lime, cilantro, hot sauce",
      instructions: "1. Season and cook chicken\n2. Warm tortillas\n3. Assemble tacos",
      mood: "excited",
      prep_time: 25,
      difficulty: "medium"
    },
    {
      name: "Calming Chamomile Tea Cookies",
      ingredients: "Flour, butter, sugar, chamomile tea, vanilla, eggs",
      instructions: "1. Mix ingredients\n2. Shape cookies\n3. Bake until golden",
      mood: "anxious",
      prep_time: 45,
      difficulty: "medium"
    },
    {
      name: "Cozy Chicken Soup",
      ingredients: "Chicken, vegetables, broth, herbs, noodles",
      instructions: "1. Simmer chicken and vegetables\n2. Add noodles\n3. Season to taste",
      mood: "sick",
      prep_time: 60,
      difficulty: "easy"
    },
    {
      name: "Chocolate Lava Cake",
      ingredients: "Dark chocolate, butter, eggs, sugar, flour",
      instructions: "1. Melt chocolate and butter\n2. Mix ingredients\n3. Bake until edges are set",
      mood: "romantic",
      prep_time: 20,
      difficulty: "medium"
    },
    {
      name: "Fresh Garden Salad",
      ingredients: "Mixed greens, tomatoes, cucumber, avocado, lemon, olive oil",
      instructions: "1. Wash and chop vegetables\n2. Make dressing\n3. Toss and serve",
      mood: "refreshed",
      prep_time: 15,
      difficulty: "easy"
    },
    {
      name: "Warm Apple Cinnamon Oatmeal",
      ingredients: "Oats, apple, cinnamon, honey, milk, nuts",
      instructions: "1. Cook oats with milk\n2. Add chopped apple and cinnamon\n3. Top with honey and nuts",
      mood: "cozy",
      prep_time: 15,
      difficulty: "easy"
    },
    {
      name: "Spicy Ramen Bowl",
      ingredients: "Ramen noodles, broth, chili, garlic, green onions, egg",
      instructions: "1. Cook noodles\n2. Prepare spicy broth\n3. Add toppings and serve",
      mood: "adventurous",
      prep_time: 20,
      difficulty: "medium"
    },
    {
      name: "Lemon Blueberry Muffins",
      ingredients: "Flour, sugar, eggs, milk, lemon, blueberries, butter",
      instructions: "1. Mix dry and wet ingredients\n2. Fold in blueberries\n3. Bake until golden",
      mood: "cheerful",
      prep_time: 35,
      difficulty: "easy"
    }
  ];

  // Check if recipes already exist
  db.get("SELECT COUNT(*) as count FROM recipes", (err, row) => {
    if (err) {
      console.error('Error checking recipes:', err);
    } else if (row.count === 0) {
      // Insert sample recipes
      const stmt = db.prepare("INSERT INTO recipes (name, ingredients, instructions, mood, prep_time, difficulty) VALUES (?, ?, ?, ?, ?, ?)");
      sampleRecipes.forEach(recipe => {
        stmt.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.mood, recipe.prep_time, recipe.difficulty);
      });
      stmt.finalize();
      console.log('Sample recipes inserted successfully');
    }
  });
});

// API Routes
app.get('/api/recipes/:mood', (req, res) => {
  const mood = req.params.mood;
  db.all("SELECT * FROM recipes WHERE mood = ? ORDER BY RANDOM() LIMIT 1", [mood], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (rows.length === 0) {
      res.status(404).json({ error: 'No recipes found for this mood' });
      return;
    }
    res.json(rows[0]);
  });
});

app.get('/api/moods', (req, res) => {
  db.all("SELECT DISTINCT mood FROM recipes", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows.map(row => row.mood));
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 