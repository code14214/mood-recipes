# 🍽️ Mood Recipe Finder

A delightful web application that recommends recipes based on your current mood! Simply select how you're feeling, and get a perfectly matched recipe suggestion with detailed information about preparation time, difficulty level, and dietary preferences.

## ✨ Features

- **Mood-Based Recommendations**: Choose from 10 different moods (sad, happy, excited, anxious, sick, romantic, refreshed, cozy, adventurous, cheerful)
- **Color-Coded Labels**: Visual indicators for cooking time, difficulty, and dietary preferences
- **Balanced Recipe Collection**: 15 recipes evenly distributed across all difficulty levels
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Interactive Experience**: Smooth animations and hover effects
- **Recipe Details**: Complete ingredients list and step-by-step instructions
- **Multiple Options**: Get new recipe suggestions for the same mood
- **Simple Setup**: Easy to run with minimal dependencies

## 🛠️ Tech Stack

- **Backend**: Express.js
- **Database**: SQLite3
- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Development Mode

For development with auto-restart on file changes:
```bash
npm run dev
```

## 📁 Project Structure

```
mood-recipe-app/
├── server.js              # Express server and API endpoints
├── package.json           # Dependencies and scripts
├── recipes.db             # SQLite database (created automatically)
├── public/
│   ├── index.html         # Main HTML page
│   └── script.js          # Frontend JavaScript
└── README.md              # This file
```

## 🎯 How It Works

1. **Mood Selection**: Users see a grid of mood buttons with emojis and colors
2. **Recipe Fetching**: The app calls the API to get a random recipe matching the selected mood
3. **Recipe Display**: Shows the recipe name, prep time, difficulty, ingredients, and instructions
4. **New Recipes**: Users can request another recipe for the same mood or change their mood

## 🗄️ Database Schema

The SQLite database contains a `recipes` table with:
- `id`: Unique identifier
- `name`: Recipe name
- `ingredients`: Comma-separated list of ingredients
- `instructions`: Step-by-step cooking instructions
- `mood`: Associated mood category
- `prep_time`: Preparation time in minutes
- `difficulty`: Easy, medium, or hard
- `dietary`: Vegan, vegetarian, or meat

## 🎨 Customization

### Adding New Recipes

You can add more recipes by modifying the `sampleRecipes` array in `server.js`:

```javascript
{
  name: "Your Recipe Name",
  ingredients: "Ingredient 1, Ingredient 2, Ingredient 3",
  instructions: "1. First step\n2. Second step\n3. Third step",
  mood: "happy", // or any existing mood
  prep_time: 30,
  difficulty: "easy", // easy, medium, or hard
  dietary: "vegetarian" // vegan, vegetarian, or meat
}
```

### Adding New Moods

1. Add the mood to the `moodConfigs` object in `script.js`
2. Add recipes for that mood in `server.js`
3. The mood will automatically appear in the UI

## 🌟 Recipe Collection

The app comes with 15 carefully curated recipes:

### Easy Recipes (🥄)
- **Sad**: Comforting Mac and Cheese
- **Happy**: Energizing Smoothie Bowl
- **Sick**: Cozy Chicken Soup
- **Refreshed**: Fresh Garden Salad
- **Excited**: Spicy Black Bean Tacos

### Medium Recipes (🔪)
- **Excited**: Spicy Chicken Tacos
- **Anxious**: Calming Chamomile Tea Cookies
- **Romantic**: Chocolate Lava Cake
- **Adventurous**: Spicy Ramen Bowl
- **Cozy**: Creamy Mushroom Risotto

### Hard Recipes (👨‍🍳)
- **Romantic**: Beef Wellington
- **Adventurous**: Sushi Roll Masterpiece
- **Cheerful**: Croissants from Scratch
- **Cozy**: Coq au Vin
- **Romantic**: Tiramisu

## 🔧 API Endpoints

- `GET /api/moods` - Returns all available moods
- `GET /api/recipes/:mood` - Returns a random recipe for the specified mood with full details including dietary info

## 🎉 Enjoy!

The app is now ready to use! Select your mood and discover delicious recipes that match your feelings. Each recipe comes with helpful visual indicators for cooking time, difficulty level, and dietary preferences. Perfect for those moments when you're not sure what to cook but know exactly how you feel.

---

*Built with ❤️ using Express, SQLite, and Tailwind CSS*

## 📊 Recipe Categories

### Difficulty Levels
- **🥄 Easy (5 recipes):** Simple recipes for beginners
- **🔪 Medium (5 recipes):** Intermediate cooking skills required  
- **👨‍🍳 Hard (5 recipes):** Advanced techniques and professional skills

### Dietary Preferences
- **🌱 Vegan:** Plant-based recipes
- **🥬 Vegetarian:** Contains dairy/eggs but no meat
- **🥩 Contains Meat:** Meat-based recipes

### Cooking Time
- **🟢 Fast (0-15 min):** Quick and easy recipes
- **🟡 Medium (16-30 min):** Moderate preparation time
- **🟠 Slow (31+ min):** Longer cooking processes

## Contributing

Feel free to submit issues and enhancement requests!

---

*Last updated: December 2024* 