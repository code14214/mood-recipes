// Global variables
let currentMood = null;
let availableMoods = [];

// DOM elements
const moodGrid = document.getElementById('moodGrid');
const recipeSection = document.getElementById('recipeSection');
const loadingSpinner = document.getElementById('loadingSpinner');
const recipeTitle = document.getElementById('recipeTitle');
const recipePrepTime = document.getElementById('recipePrepTime');
const recipeDifficulty = document.getElementById('recipeDifficulty');
const recipeDietary = document.getElementById('recipeDietary');
const ingredientsList = document.getElementById('ingredientsList');
const instructionsList = document.getElementById('instructionsList');
const newRecipeBtn = document.getElementById('newRecipeBtn');
const changeMoodBtn = document.getElementById('changeMoodBtn');

// Mood configurations with emojis and colors
const moodConfigs = {
    'sad': { emoji: '😢', color: 'bg-mood-sad', textColor: 'text-white' },
    'happy': { emoji: '😊', color: 'bg-mood-happy', textColor: 'text-gray-800' },
    'excited': { emoji: '🤩', color: 'bg-mood-excited', textColor: 'text-white' },
    'anxious': { emoji: '😰', color: 'bg-mood-anxious', textColor: 'text-white' },
    'sick': { emoji: '🤒', color: 'bg-mood-sick', textColor: 'text-white' },
    'romantic': { emoji: '💕', color: 'bg-mood-romantic', textColor: 'text-white' },
    'refreshed': { emoji: '😌', color: 'bg-mood-refreshed', textColor: 'text-white' },
    'cozy': { emoji: '🥰', color: 'bg-mood-cozy', textColor: 'text-white' },
    'adventurous': { emoji: '🤠', color: 'bg-mood-adventurous', textColor: 'text-white' },
    'cheerful': { emoji: '😄', color: 'bg-mood-cheerful', textColor: 'text-gray-800' }
};

// Initialize the app
async function init() {
    try {
        await loadMoods();
        createMoodButtons();
        setupEventListeners();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        showError('Failed to load moods. Please refresh the page.');
    }
}

// Load available moods from the API
async function loadMoods() {
    try {
        const response = await fetch('/api/moods');
        if (!response.ok) {
            throw new Error('Failed to fetch moods');
        }
        availableMoods = await response.json();
    } catch (error) {
        console.error('Error loading moods:', error);
        throw error;
    }
}

// Create mood selection buttons
function createMoodButtons() {
    moodGrid.innerHTML = '';
    
    availableMoods.forEach(mood => {
        const config = moodConfigs[mood] || { emoji: '🍽️', color: 'bg-gray-500', textColor: 'text-white' };
        
        const button = document.createElement('button');
        button.className = `${config.color} ${config.textColor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-current`;
        button.innerHTML = `
            <div class="text-4xl mb-2">${config.emoji}</div>
            <div class="font-semibold capitalize">${mood}</div>
        `;
        
        button.addEventListener('click', () => selectMood(mood));
        moodGrid.appendChild(button);
    });
}

// Handle mood selection
async function selectMood(mood) {
    currentMood = mood;
    showLoading();
    
    try {
        const recipe = await fetchRecipe(mood);
        displayRecipe(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        showError('Failed to fetch recipe. Please try again.');
    }
}

// Fetch recipe from API
async function fetchRecipe(mood) {
    const response = await fetch(`/api/recipes/${mood}`);
    if (!response.ok) {
        throw new Error('Failed to fetch recipe');
    }
    return await response.json();
}

// Display recipe information
function displayRecipe(recipe) {
    hideLoading();
    
    // Update recipe title and metadata
    recipeTitle.textContent = recipe.name;
    recipePrepTime.textContent = `${recipe.prep_time} minutes`;
    
    // Set difficulty badge
    const difficultyColors = {
        'easy': 'bg-green-100 text-green-800',
        'medium': 'bg-yellow-100 text-yellow-800',
        'hard': 'bg-red-100 text-red-800'
    };
    recipeDifficulty.className = `px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[recipe.difficulty] || 'bg-gray-100 text-gray-800'}`;
    recipeDifficulty.textContent = recipe.difficulty;
    
    // Set dietary badge
    const dietaryColors = {
        'vegan': 'bg-green-100 text-green-800',
        'vegetarian': 'bg-blue-100 text-blue-800',
        'meat': 'bg-red-100 text-red-800'
    };
    const dietaryLabels = {
        'vegan': '🌱 Vegan',
        'vegetarian': '🥬 Vegetarian',
        'meat': '🥩 Contains Meat'
    };
    recipeDietary.className = `px-2 py-1 rounded-full text-xs font-medium ${dietaryColors[recipe.dietary] || 'bg-gray-100 text-gray-800'}`;
    recipeDietary.textContent = dietaryLabels[recipe.dietary] || recipe.dietary;
    
    // Display ingredients
    ingredientsList.innerHTML = '';
    const ingredients = recipe.ingredients.split(', ');
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';
        li.innerHTML = `
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>${ingredient.trim()}</span>
        `;
        ingredientsList.appendChild(li);
    });
    
    // Display instructions
    instructionsList.innerHTML = '';
    const instructions = recipe.instructions.split('\n');
    instructions.forEach(instruction => {
        if (instruction.trim()) {
            const li = document.createElement('li');
            li.className = 'flex gap-3';
            li.innerHTML = `
                <span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">${instructionsList.children.length + 1}</span>
                <span>${instruction.trim()}</span>
            `;
            instructionsList.appendChild(li);
        }
    });
    
    // Show recipe section with animation
    recipeSection.classList.remove('hidden');
    recipeSection.classList.add('animate-fade-in');
}

// Show loading spinner
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    recipeSection.classList.add('hidden');
}

// Hide loading spinner
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

// Show error message
function showError(message) {
    hideLoading();
    alert(message); // Simple error handling - could be improved with a toast notification
}

// Setup event listeners
function setupEventListeners() {
    // New recipe button
    newRecipeBtn.addEventListener('click', async () => {
        if (currentMood) {
            showLoading();
            try {
                const recipe = await fetchRecipe(currentMood);
                displayRecipe(recipe);
            } catch (error) {
                console.error('Error fetching new recipe:', error);
                showError('Failed to fetch new recipe. Please try again.');
            }
        }
    });
    
    // Change mood button
    changeMoodBtn.addEventListener('click', () => {
        recipeSection.classList.add('hidden');
        currentMood = null;
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init); 