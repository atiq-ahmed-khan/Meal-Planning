document.addEventListener('DOMContentLoaded', () => {
    const mealForm = document.getElementById('meal-form');
    const mealNameInput = document.getElementById('meal-name');
    const ingredientsInput = document.getElementById('ingredients');
    const mealList = document.getElementById('meal-list');
    const savePlanButton = document.getElementById('save-plan');
    const messageDiv = document.getElementById('message');

    mealForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const mealName = mealNameInput.value;
        const ingredients = ingredientsInput.value;

        addMealToDOM(mealName, ingredients);
        mealNameInput.value = '';
        ingredientsInput.value = '';
    });

    savePlanButton.addEventListener('click', () => {
        const meals = Array.from(mealList.children).map((item) => {
            const mealName = item.querySelector('.meal-name').textContent;
            const ingredients = item.querySelector('.ingredients').textContent;
            return { mealName, ingredients };
        });

        localStorage.setItem('mealPlan', JSON.stringify(meals));
        messageDiv.textContent = 'Meal plan saved!';
    });

    function addMealToDOM(mealName, ingredients) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="meal-name">${mealName}</span>
            <span class="ingredients">${ingredients}</span>
            <button>Delete</button>
        `;

        const deleteButton = li.querySelector('button');
        deleteButton.addEventListener('click', () => {
            mealList.removeChild(li);
        });

        mealList.appendChild(li);
    }

    // Load saved meal plan
    (function loadMealPlan() {
        const savedPlan = JSON.parse(localStorage.getItem('mealPlan') || '[]');
        savedPlan.forEach((meal) => {
            addMealToDOM(meal.mealName, meal.ingredients);
        });
    })();
});

