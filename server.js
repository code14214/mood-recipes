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
    difficulty TEXT,
    dietary TEXT
  )`);

  // Insert sample recipes for different moods
  const sampleRecipes = [
    {
      name: "Comforting Mac and Cheese",
      ingredients: "Macaroni, cheddar cheese, milk, butter, flour, breadcrumbs",
      instructions: "1. Cook macaroni\n2. Make cheese sauce\n3. Combine and bake",
      mood: "sad",
      prep_time: 30,
      difficulty: "easy",
      dietary: "vegetarian"
    },
    {
      name: "Energizing Smoothie Bowl",
      ingredients: "Banana, berries, yogurt, granola, honey, chia seeds",
      instructions: "1. Blend fruits with yogurt\n2. Top with granola and seeds",
      mood: "happy",
      prep_time: 10,
      difficulty: "easy",
      dietary: "vegetarian"
    },
    {
      name: "Spicy Chicken Tacos",
      ingredients: "Chicken, tortillas, spices, lime, cilantro, hot sauce",
      instructions: "1. Season and cook chicken\n2. Warm tortillas\n3. Assemble tacos",
      mood: "excited",
      prep_time: 25,
      difficulty: "medium",
      dietary: "meat"
    },
    {
      name: "Calming Chamomile Tea Cookies",
      ingredients: "Flour, butter, sugar, chamomile tea, vanilla, eggs",
      instructions: "1. Mix ingredients\n2. Shape cookies\n3. Bake until golden",
      mood: "anxious",
      prep_time: 45,
      difficulty: "medium",
      dietary: "vegetarian"
    },
    {
      name: "Cozy Chicken Soup",
      ingredients: "Chicken, vegetables, broth, herbs, noodles",
      instructions: "1. Simmer chicken and vegetables\n2. Add noodles\n3. Season to taste",
      mood: "sick",
      prep_time: 60,
      difficulty: "easy",
      dietary: "meat"
    },
    {
      name: "Chocolate Lava Cake",
      ingredients: "Dark chocolate, butter, eggs, sugar, flour",
      instructions: "1. Melt chocolate and butter\n2. Mix ingredients\n3. Bake until edges are set",
      mood: "romantic",
      prep_time: 20,
      difficulty: "medium",
      dietary: "vegetarian"
    },
    {
      name: "Fresh Garden Salad",
      ingredients: "Mixed greens, tomatoes, cucumber, avocado, lemon, olive oil",
      instructions: "1. Wash and chop vegetables\n2. Make dressing\n3. Toss and serve",
      mood: "refreshed",
      prep_time: 15,
      difficulty: "easy",
      dietary: "vegan"
    },
    {
      name: "Warm Apple Cinnamon Oatmeal",
      ingredients: "Oats, apple, cinnamon, honey, milk, nuts",
      instructions: "1. Cook oats with milk\n2. Add chopped apple and cinnamon\n3. Top with honey and nuts",
      mood: "cozy",
      prep_time: 15,
      difficulty: "easy",
      dietary: "vegetarian"
    },
    {
      name: "Spicy Ramen Bowl",
      ingredients: "Ramen noodles, broth, chili, garlic, green onions, egg",
      instructions: "1. Cook noodles\n2. Prepare spicy broth\n3. Add toppings and serve",
      mood: "adventurous",
      prep_time: 20,
      difficulty: "medium",
      dietary: "vegetarian"
    },
    {
      name: "Creamy Mushroom Risotto",
      ingredients: "Arborio rice, mushrooms, vegetable broth, white wine, parmesan, butter, onion, garlic",
      instructions: "1. Sauté mushrooms and onions\n2. Add rice and wine\n3. Gradually add broth while stirring\n4. Finish with parmesan",
      mood: "cozy",
      prep_time: 40,
      difficulty: "medium",
      dietary: "vegetarian"
    },
    {
      name: "Spicy Black Bean Tacos",
      ingredients: "Black beans, tortillas, bell peppers, onion, spices, lime, avocado, cilantro, hot sauce",
      instructions: "1. Sauté vegetables and beans with spices\n2. Warm tortillas\n3. Assemble with toppings",
      mood: "excited",
      prep_time: 20,
      difficulty: "easy",
      dietary: "vegan"
    },
    {
      name: "Beef Wellington",
      ingredients: "Beef tenderloin, puff pastry, mushrooms, shallots, garlic, prosciutto, Dijon mustard, egg wash, herbs",
      instructions: "1. Sear beef tenderloin\n2. Prepare mushroom duxelles\n3. Wrap in prosciutto and puff pastry\n4. Brush with egg wash and bake",
      mood: "romantic",
      prep_time: 90,
      difficulty: "hard",
      dietary: "meat"
    },
    {
      name: "Sushi Roll Masterpiece",
      ingredients: "Sushi rice, nori, fresh fish, avocado, cucumber, wasabi, soy sauce, rice vinegar, bamboo mat",
      instructions: "1. Prepare sushi rice with vinegar\n2. Lay nori on bamboo mat\n3. Spread rice and add fillings\n4. Roll tightly and slice",
      mood: "adventurous",
      prep_time: 75,
      difficulty: "hard",
      dietary: "meat"
    },
    {
      name: "Croissants from Scratch",
      ingredients: "Flour, butter, yeast, milk, sugar, salt, egg wash",
      instructions: "1. Make dough and let rise\n2. Create butter layers\n3. Fold and roll multiple times\n4. Shape and bake until golden",
      mood: "cheerful",
      prep_time: 180,
      difficulty: "hard",
      dietary: "vegetarian"
    },
    {
      name: "Coq au Vin",
      ingredients: "Chicken, red wine, bacon, mushrooms, pearl onions, garlic, herbs, butter, flour",
      instructions: "1. Marinate chicken in wine\n2. Brown chicken and bacon\n3. Simmer with vegetables and wine\n4. Reduce sauce and serve",
      mood: "cozy",
      prep_time: 120,
      difficulty: "hard",
      dietary: "meat"
    },
    {
      name: "Tiramisu",
      ingredients: "Ladyfingers, mascarpone cheese, eggs, sugar, coffee, cocoa powder, vanilla, rum",
      instructions: "1. Make coffee and cool\n2. Beat egg yolks with sugar\n3. Fold in mascarpone\n4. Layer with coffee-dipped ladyfingers",
      mood: "romantic",
      prep_time: 60,
      difficulty: "hard",
      dietary: "vegetarian"
    },
    // Additional recipes for more variety
    {
      name: "Warm Chocolate Chip Cookies",
      ingredients: "Flour, butter, chocolate chips, sugar, eggs, vanilla, baking soda",
      instructions: "1. Cream butter and sugar\n2. Mix in eggs and vanilla\n3. Add flour and chocolate chips\n4. Bake until golden",
      mood: "sad",
      prep_time: 25,
      difficulty: "easy",
      dietary: "vegetarian"
    },
    {
      name: "Grilled Cheese with Tomato Soup",
      ingredients: "Bread, cheddar cheese, butter, tomatoes, cream, basil, garlic",
      instructions: "1. Make grilled cheese sandwich\n2. Prepare tomato soup\n3. Serve together",
      mood: "sad",
      prep_time: 20,
      difficulty: "easy",
      dietary: "vegetarian"
    },
    {
      name: "Tropical Fruit Salad",
      ingredients: "Pineapple, mango, papaya, coconut, lime, mint",
      instructions: "1. Chop all fruits\n2. Mix with lime juice\n3. Garnish with mint",
      mood: "happy",
      prep_time: 15,
      difficulty: "easy",
      dietary: "vegan"
    },
    {
      name: "Rainbow Smoothie",
      ingredients: "Strawberries, orange, banana, spinach, almond milk, honey",
      instructions: "1. Blend all ingredients\n2. Adjust sweetness if needed\n3. Serve immediately",
      mood: "happy",
      prep_time: 8,
      difficulty: "easy",
      dietary: "vegan"
    },
    {
      name: "Spicy Korean BBQ Tacos",
      ingredients: "Beef, tortillas, kimchi, gochujang, sesame oil, green onions",
      instructions: "1. Marinate beef in Korean spices\n2. Grill beef to perfection\n3. Assemble with kimchi",
      mood: "excited",
      prep_time: 35,
      difficulty: "medium",
      dietary: "meat"
    },
    {
      name: "Buffalo Chicken Wings",
      ingredients: "Chicken wings, hot sauce, butter, blue cheese, celery",
      instructions: "1. Season and bake wings\n2. Toss in buffalo sauce\n3. Serve with blue cheese dip",
      mood: "excited",
      prep_time: 45,
      difficulty: "medium",
      dietary: "meat"
    },
    {
      name: "Lavender Chamomile Tea Cake",
      ingredients: "Flour, butter, sugar, eggs, lavender, chamomile tea, vanilla",
      instructions: "1. Infuse butter with lavender\n2. Mix cake batter\n3. Bake until springy",
      mood: "anxious",
      prep_time: 50,
      difficulty: "medium",
      dietary: "vegetarian"
    },
    {
      name: "Calming Oatmeal with Honey",
      ingredients: "Oats, honey, cinnamon, banana, walnuts, milk",
      instructions: "1. Cook oats with milk\n2. Add honey and cinnamon\n3. Top with banana and walnuts",
      mood: "anxious",
      prep_time: 12,
      difficulty: "easy",
      dietary: "vegetarian"
    },
    {
      name: "Healing Ginger Turmeric Tea",
      ingredients: "Fresh ginger, turmeric, honey, lemon, hot water",
      instructions: "1. Slice ginger and turmeric\n2. Steep in hot water\n3. Add honey and lemon",
      mood: "sick",
      prep_time: 10,
      difficulty: "easy",
      dietary: "vegan"
    },
    {
      name: "Comforting Rice Pudding",
      ingredients: "Rice, milk, sugar, vanilla, cinnamon, raisins",
      instructions: "1. Cook rice with milk\n2. Add sugar and vanilla\n3. Stir in raisins and cinnamon",
      mood: "sick",
      prep_time: 30,
      difficulty: "easy",
      dietary: "vegetarian"
    },
    {
      name: "Strawberry Chocolate Fondue",
      ingredients: "Dark chocolate, heavy cream, strawberries, marshmallows, graham crackers",
      instructions: "1. Melt chocolate with cream\n2. Arrange dipping items\n3. Serve warm",
      mood: "romantic",
      prep_time: 15,
      difficulty: "easy",
      dietary: "vegetarian"
    },
    {
      name: "Citrus Mint Water",
      ingredients: "Lemon, lime, orange, mint leaves, cold water",
      instructions: "1. Slice citrus fruits\n2. Add mint leaves\n3. Refrigerate for 2 hours",
      mood: "refreshed",
      prep_time: 5,
      difficulty: "easy",
      dietary: "vegan"
    },
    {
      name: "Green Goddess Bowl",
      ingredients: "Quinoa, avocado, cucumber, edamame, lime, cilantro, olive oil",
      instructions: "1. Cook quinoa\n2. Chop vegetables\n3. Mix with dressing",
      mood: "refreshed",
      prep_time: 25,
      difficulty: "medium",
      dietary: "vegan"
    },
    {
      name: "Cinnamon Roll Pancakes",
      ingredients: "Flour, milk, eggs, cinnamon, brown sugar, cream cheese, maple syrup",
      instructions: "1. Make pancake batter\n2. Add cinnamon swirl\n3. Top with cream cheese glaze",
      mood: "cozy",
      prep_time: 30,
      difficulty: "medium",
      dietary: "vegetarian"
    },
    {
      name: "Thai Green Curry",
      ingredients: "Coconut milk, green curry paste, vegetables, tofu, fish sauce, basil",
      instructions: "1. Sauté curry paste\n2. Add coconut milk and vegetables\n3. Simmer until tender",
      mood: "adventurous",
      prep_time: 40,
      difficulty: "medium",
      dietary: "vegetarian"
    },
    {
      name: "Lemon Poppy Seed Muffins",
      ingredients: "Flour, sugar, eggs, milk, lemon, poppy seeds, butter",
      instructions: "1. Mix dry ingredients\n2. Combine wet ingredients\n3. Bake until golden",
      mood: "cheerful",
      prep_time: 35,
      difficulty: "medium",
      dietary: "vegetarian"
    }
  ];

  // Check if recipes already exist
  db.get("SELECT COUNT(*) as count FROM recipes", (err, row) => {
    if (err) {
      console.error('Error checking recipes:', err);
    } else if (row.count === 0) {
      // Insert sample recipes
      const stmt = db.prepare("INSERT INTO recipes (name, ingredients, instructions, mood, prep_time, difficulty, dietary) VALUES (?, ?, ?, ?, ?, ?, ?)");
      sampleRecipes.forEach(recipe => {
        stmt.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.mood, recipe.prep_time, recipe.difficulty, recipe.dietary);
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