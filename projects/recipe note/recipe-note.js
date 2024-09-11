let recipeArray = JSON.parse(localStorage.getItem('recipeArray')) || [];
let selected = 0;
let toolTip = false;
let overlay = false;
const mainAddInputElem = document.querySelector('.js-main-add-button-container');
const mainRecipeAddButton = document.querySelector('.js-add-recipe-button');


const deleteSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path  class="js-remove-item-btn" d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"></path>
  </svg>
`;

renderRecipeName();


// FOR THE ADD BUTTON
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-add-recipe-button')) {
    document.querySelector('.js-main-add-button-container').innerHTML = `
    <div class="recipe-input-container">
      <input type="text" class="recipe-input js-recipe-input" placeholder="Enter Recipe Name">
      <button class="recipe-input-cancel-button js-recipe-input-control-button">X</button>
    </div>
    `;
    document.querySelector('.js-recipe-input').focus();
    changeMainInputButton();

    document.querySelector('.js-recipe-input-control-button')
    .addEventListener('click', () => {
      if (document.querySelector('.js-recipe-input-control-button').innerHTML === 'X') {
        document.querySelector('.js-main-add-button-container').innerHTML = `
        <button class="add-recipe-button js-add-recipe-button">+</button>
        `;
      } else if (document.querySelector('.js-recipe-input-control-button').innerHTML === '+') {
        let recipeNameInput = document.querySelector('.js-recipe-input');
        let recipeName = recipeNameInput.value

        recipeArray.push(
          { 
            recipeName , 
            steps: [],
            ingredients: [],
          }
        );
        // console.log(recipeArray);

        document.querySelector('.js-recipe-input').value = '';
        document.querySelector('.js-main-add-button-container').innerHTML = `
        <button class="add-recipe-button js-add-recipe-button" >+</button>
        `;
        saveRecipeArray();
        renderRecipeName();
      }
    });

    // FOR INPUT KEYDOWN.
    document.querySelector('.js-recipe-input')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        if (document.querySelector('.js-recipe-input-control-button').innerHTML === '+') {
          let recipeNameInput = document.querySelector('.js-recipe-input');
          let recipeName = recipeNameInput.value
          recipeArray.push(
            { 
              recipeName , 
              steps: [],
              ingredients: [],
            }
          );
          document.querySelector('.js-recipe-input').value = '';
          document.querySelector('.js-main-add-button-container').innerHTML = `
          <button class="add-recipe-button js-add-recipe-button" >+</button>
          `;
          saveRecipeArray();
          renderRecipeName();
        }
      } else if (event.key === 'Escape') {
        document.querySelector('.js-main-add-button-container').innerHTML = `
          <button class="add-recipe-button js-add-recipe-button">+</button>
        `;
      }
      // console.log(event.key);
    });
  }
});

// FOR THE EDIT BUTTON
document.querySelector('.js-edit-delete-button').addEventListener('click', (e) => {
  if (recipeArray.length !== 0) {
    // console.log(document.querySelector('.js-edit-delete-button').innerHTML);
    // console.log(deleteSVG);
    // console.log(e.target);
    
    if (document.querySelector('.js-edit-delete-button').innerHTML === '/') {
      document.querySelector('.js-edit-delete-button').innerHTML = 'x';
      if (document.querySelector('.js-edit-delete-button').classList.contains('show-delete-svg')) {
        document.querySelector('.js-edit-delete-button').classList.remove('show-delete-svg');
      }
      document.querySelector('.js-select-all-button-container').innerHTML = `
        <button class="select-all-button js-select-all-button">Select All</button>
      `;
      document.querySelector('.js-select-all-button').addEventListener('click', () => {
        if (document.querySelector('.js-select-all-button').innerHTML === 'Select All') {
          selectorAll();
          document.querySelector('.js-select-all-button').innerHTML = 'Deselect All';
        } else if (document.querySelector('.js-select-all-button').innerHTML === 'Deselect All') {
          deselectAll();
          document.querySelector('.js-select-all-button').innerHTML = 'Select All';
        }

      });
      document.querySelectorAll('.js-checkbox-add-button-container').forEach((addButtonCheckboxElem) => {
        addButtonCheckboxElem.innerHTML = `
        <input type="checkbox" class="delete-checkbox js-delete-checkbox">
        `;
      });

      document.querySelectorAll('.js-delete-checkbox').forEach((eachCheckbox) => {
        eachCheckbox.addEventListener('click', () => {
          if (eachCheckbox.checked) {
            selected++;
          } else {
            selected--;
          }
          changeEditText();

          if (document.querySelectorAll('.js-delete-checkbox').length === selected) {
            document.querySelector('.js-select-all-button').innerHTML = 'Deselect All';
          } else {
            document.querySelector('.js-select-all-button').innerHTML = 'Select All';
          }
        });
      });
    } else if (document.querySelector('.js-edit-delete-button').innerHTML === 'x') {
      document.querySelector('.js-edit-delete-button').innerHTML = '/';
      document.querySelector('.js-edit-delete-button').classList.remove('show-delete-svg');
      document.querySelector('.js-select-all-button-container').innerHTML = '';
      document.querySelectorAll('.js-checkbox-add-button-container').forEach((addButtonCheckboxElem) => {
        addButtonCheckboxElem.innerHTML = `
        <button class="each-recipe-add-button js-each-recipe-add-button">+</button>
        `;
      });
    } else {

      console.log(document.querySelector('.js-edit-delete-button').innerHTML);
      console.log(document.querySelector('.js-edit-delete-button').innerHTML == deleteSVG);
      
      
      // if (document.querySelector('.js-edit-delete-button').innerHTML === deleteSVG)
      console.log(deleteSVG);
      console.log(e.target);
      
      let text = 'recipes';
      if (selected === 1) {
        text = 'recipe';
      } 
      document.querySelector('.js-overlay').innerHTML = `
        <div class="main-delete-message-holder">
          <div class="main-delete-message-container">
            <p class="main-delete-message-text">
              Delete ${selected} ${text}...
            </p>
            <div class="main-delete-message-buttons-container">
              <button class="js-yes-delete-button">YES</button>
              <button class="js-no-delete-button">NO</button>
            </div>
          </div>
        </div>
      `;

      document.querySelector('.js-no-delete-button').addEventListener('click', () => {
        document.querySelector('.js-overlay').innerHTML = '';
      });

      document.querySelector('.js-yes-delete-button').addEventListener('click', () => {
        deleteRecipe();
        selected = 0;
        document.querySelector('.js-overlay').innerHTML = '';
        document.querySelector('.js-cancel-button-container').innerHTML = '';
        document.querySelector('.js-select-all-button-container').innerHTML = '';
        document.querySelector('.js-edit-delete-button').innerHTML = '/';
        document.querySelector('.js-edit-delete-button').classList.remove('show-delete-svg');
      });

      // FOR KEYDOWN
      document.querySelector('.js-edit-delete-button')
      .addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          deleteRecipe();
          selected = 0;
          document.querySelector('.js-overlay').innerHTML = '';
          document.querySelector('.js-cancel-button-container').innerHTML = '';
          document.querySelector('.js-select-all-button-container').innerHTML = '';
          document.querySelector('.js-edit-delete-button').innerHTML = '/';
        }
      });
    }
  }
});

// KEYDOWNS.
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    if ((event.target.classList.contains('js-recipe-input') === false) && (event.target.classList.contains('js-recipe-name-edit-input') === false) && (event.target.classList.contains('js-steps-input') === false) && (event.target.classList.contains('js-ingredients-input') === false) && (event.target.classList.contains('js-steps-edit-input') === false) && (event.target.classList.contains('js-ingredients-edit-input') === false)) {
      if (recipeArray.length !== 0) {
        document.querySelector('.js-edit-delete-button').innerHTML = 'x';
        document.querySelector('.js-select-all-button-container').innerHTML = `
          <button class="select-all-button js-select-all-button">Select All</button>
        `;
        document.querySelector('.js-select-all-button').addEventListener('click', () => {
          if (document.querySelector('.js-select-all-button').innerHTML === 'Select All') {
            selectorAll();
            document.querySelector('.js-select-all-button').innerHTML = 'Deselect All';
          } else if (document.querySelector('.js-select-all-button').innerHTML === 'Deselect All') {
            deselectAll();
            document.querySelector('.js-select-all-button').innerHTML = 'Select All';
          }
        });
        document.querySelectorAll('.js-checkbox-add-button-container').forEach((addButtonCheckboxElem) => {
          addButtonCheckboxElem.innerHTML = `
          <input type="checkbox" class="delete-checkbox js-delete-checkbox">
          `;
        });
  
        document.querySelectorAll('.js-delete-checkbox').forEach((eachCheckbox) => {
          eachCheckbox.addEventListener('click', () => {
            if (eachCheckbox.checked) {
              selected++;
            } else {
              selected--;
            }
            changeEditText();
  
            if (document.querySelectorAll('.js-delete-checkbox').length === selected) {
              document.querySelector('.js-select-all-button').innerHTML = 'Deselect All';
            } else {
              document.querySelector('.js-select-all-button').innerHTML = 'Select All';
            }
          });
        });
      }
    }
  } 
  else if (event.key === 'Enter') {
    if (selected !== 0) {
      let text = 'recipes';
      if (selected === 1) {
        text = 'recipe';
      } 
      document.querySelector('.js-overlay').innerHTML = `
        <div class="main-delete-message-holder">
          <div class="main-delete-message-container">
            <p class="main-delete-message-text">
              Delete ${selected} ${text}..
            </p>
            <div class="main-delete-message-buttons-container">
              <button class="js-yes-delete-button">YES</button>
              <button class="js-no-delete-button">NO</button>
            </div>
          </div>
        </div>
      `;

      document.querySelector('.js-no-delete-button').addEventListener('click', () => {
        document.querySelector('.js-overlay').innerHTML = '';
      });

      document.querySelector('.js-yes-delete-button').addEventListener('click', () => {
        deleteRecipe();
        selected = 0;
        document.querySelector('.js-overlay').innerHTML = '';
        document.querySelector('.js-cancel-button-container').innerHTML = '';
        document.querySelector('.js-select-all-button-container').innerHTML = '';
        document.querySelector('.js-edit-delete-button').innerHTML = '/';
      });
    }

    if (event.target.classList.contains('js-no-delete-button')) {
      document.querySelector('.js-overlay').innerHTML = '';
    } else if (event.target.classList.contains('js-yes-delete-button')) {
      deleteRecipe();
      selected = 0;
      document.querySelector('.js-overlay').innerHTML = '';
      document.querySelector('.js-cancel-button-container').innerHTML = '';
      document.querySelector('.js-select-all-button-container').innerHTML = '';
      document.querySelector('.js-edit-delete-button').innerHTML = '/';
    }
  }
});




// ALL FUNCTIONS
function renderRecipeName() {
  let reversedArr = recipeArray.slice().reverse();
  let finalHtml = '';

  reversedArr.forEach((eachRecipe, index) => {
    let finalStepsHtml = '';
    let finalIngredientsHtml = '';

    eachRecipe.steps.forEach((individualStep) => {
      const stepsOlLi = `
        <div class="steps-li-holder js-steps-li-holder">
          <li>${individualStep}</li>
          <button class="steps-li-edit-button js-steps-li-edit-button" title="Edit Step">/</button>
        </div>
      `;
      finalStepsHtml += stepsOlLi;
    });

    if (eachRecipe.steps.length === 0) {
      finalStepsHtml = `
        <p class="steps-info-text">Add Steps</p>
      `
    }
    eachRecipe.ingredients.forEach((individualIngredient) => {
      const ingredientOlLi = `
        <div class="ingredients-li-holder js-ingredients-li-holder">
          <li>${individualIngredient}</li> 
          <button class="ingredients-li-edit-button js-ingredients-li-edit-button" title="Edit Ingredient">/</button>
        </div>
      `;
      finalIngredientsHtml += ingredientOlLi;
    });

    if (eachRecipe.ingredients.length === 0) {
      finalIngredientsHtml = `
        <p class="ingredients-info-text">Add Ingredient</p>
      `
    }

    const eachRecipeHtml = `
      <article class="each-recipe js-each-recipe">
        <section class="recipe-name-section">
          <div class="recipe-name-container">
            <button class="dot"></button>
            <div class="js-recipe-name-holder">
              <p class="recipe-name js-recipe-name" title="Click to Edit">${eachRecipe.recipeName}</p>
            </div>
          </div>

          <div class="add-button-container js-add-button-container">
            <div class="checkbox-add-button-container js-checkbox-add-button-container">
              <button class="each-recipe-add-button js-each-recipe-add-button">+</button>
            </div>
            <div class="js-add-tool-tip-container"></div>
          </div>
        </section>

        <section class="steps-ingredients-section">
          <div class="steps-container">
            <div class="steps-section-header">
              <p>Steps</p>
              <button class="js-steps-delete-button">
                <svg  class="js-remove-item-btn" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path  class="js-remove-item-btn" d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"></path>
                </svg>
              </button>
            </div>
            <div class="js-delete-steps-message-container"></div>
            <ol type="" class="steps-list js-steps-list">
              ${finalStepsHtml}
            </ol>
            <div class="steps-input-container-holder js-steps-input-container";></div>
          </div>

          <div class="ingredients-container">
            <div class="ingredients-section-header">
              <p>Ingredients</p>
              <button class="js-ingredients-delete-button">
                <svg  class="js-remove-item-btn" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path  class="js-remove-item-btn" d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"></path>
                </svg>
              </button>
            </div>
            <div class="js-delete-ingredients-message-container"></div>
            <ul class="ingredients-list js-ingredients-list">
              ${finalIngredientsHtml}
            </ul>
            <div class="ingredients-input-container-holder js-ingredients-input-container">
            </div>
          </div>
        </section>
      </article>
    `;
    finalHtml += eachRecipeHtml;
  });
  document.querySelector('.js-main-container').innerHTML = finalHtml;

  document.querySelectorAll('.js-add-button-container').forEach((addButtonContainer, index) => {
    addButtonContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('js-each-recipe-add-button')) {
        event.currentTarget.querySelector('.js-add-tool-tip-container').innerHTML = `
          <div class="tool-tip">
            <p class="tool-tip-add-step js-tool-tip-add-step">Add Step</p>
            <p class="tool-tip-add-ingredient js-tool-tip-add-ingredient">Add Ingredient</p>
          </div>
        `;
        toolTip = true;
      }

      document.querySelectorAll('.js-each-recipe').forEach((eachRecipe) => {
        eachRecipe.addEventListener('click', (event) => {
          // FOR STEPS
          if (event.target.classList.contains('js-tool-tip-add-step')) {
            eachRecipe.querySelector('.js-steps-input-container').innerHTML = `
              <div class="steps-input-container">
                <input type="text" class="steps-input js-steps-input" placeholder="Enter Step">
                <button class="steps-input-add-button js-steps-input-add-button">+</button>
                <button class="steps-input-done-button js-steps-input-done-button">Done</button>
              </div>
            `;
            document.querySelector('.js-steps-input').focus();

            eachRecipe.querySelector('.js-steps-input-add-button')
            .addEventListener('click', () => {
              let finalStepsHtml = '';
              let eachStepInputElem = eachRecipe.querySelector('.js-steps-input');
              let eachStep = eachStepInputElem.value;
              let stepsArr = reversedArr[index].steps;

              if (eachStepInputElem.value !== '') {
                stepsArr.push(eachStep);
                eachStepInputElem.value = '';

                // console.log(eachStep);
                // console.log(stepsArr);
  
                stepsArr.forEach((step) => {
                  const stepListItem = `
                    <div class="li-holder js-li-holder">
                      <li>${step}</li>
                      <button class="steps-li-edit-button js-steps-li-edit-button" title="Edit Step">/</button>
                    </div>
                  `; 
                  finalStepsHtml += stepListItem;
                });
                eachRecipe.querySelector('.js-steps-list').innerHTML = finalStepsHtml;

                // FOR STEPS DELETE BUTTON
                if (eachRecipe.querySelector('.js-steps-delete-button').classList.contains('steps-delete-button') === false) {
                  eachRecipe.querySelector('.js-steps-delete-button').classList.add('steps-delete-button');
                }
              }

              /*
              // This does the work too! But when you run rerenderRecipeName, the input element vanishes. We don't want that!

              let eachStepInputElem = eachRecipe.querySelector('.js-steps-input');
              let eachStep = eachStepInputElem.value;
              let newIndex = reversedArr.length - 1 - index;
              let recipe = recipeArray[newIndex]

              if (eachStep !== '') {
                recipe.steps.push(eachStep);
              }
              saveRecipeArray();
              renderRecipeName();
              */

              saveRecipeArray();
              document.querySelector('.js-steps-input').focus();
            });

            eachRecipe.querySelector('.js-steps-input-done-button')
            .addEventListener('click', () => {
              eachRecipe.querySelector('.js-steps-input-container').innerHTML = '';
            });

            // FOR KEYDOWN.
            eachRecipe.querySelector('.js-steps-input')
            .addEventListener('keydown', (event) => {
              if (event.key === 'Enter') {
                let finalStepsHtml = '';
                let eachStepInputElem = eachRecipe.querySelector('.js-steps-input');
                let eachStep = eachStepInputElem.value;
                let stepsArr = reversedArr[index].steps;
                if (eachStepInputElem.value !== '') {
                  stepsArr.push(eachStep);
                  eachStepInputElem.value = '';
                  // console.log(eachStep);
                  // console.log(stepsArr);
                  stepsArr.forEach((step) => {
                    const stepListItem = `
                      <li>${step}</li>
                    `; 
                    finalStepsHtml += stepListItem;
                  });
                  eachRecipe.querySelector('.js-steps-list').innerHTML = finalStepsHtml;
                  // FOR STEPS DELETE BUTTON
                  if (eachRecipe.querySelector('.js-steps-delete-button').classList.contains('steps-delete-button') === false) {
                    eachRecipe.querySelector('.js-steps-delete-button').classList.add('steps-delete-button');
                  }
                }
                saveRecipeArray();
                document.querySelector('.js-steps-input').focus();
              } else if (event.key === 'Escape') {
                eachRecipe.querySelector('.js-steps-input-container').innerHTML = '';
              }
            });
          }

          // FOR INGREDIENTS
          if (event.target.classList.contains('js-tool-tip-add-ingredient')) {
            eachRecipe.querySelector('.js-ingredients-input-container').innerHTML = `
              <div class="ingredients-input-container">
                <input type="text" class="ingredients-input js-ingredients-input" placeholder="Enter Ingredient">
                <button class="ingredients-input-add-button js-ingredients-input-add-button">+</button>
                <button class="ingredients-input-done-button js-ingredients-input-done-button">Done</button>
              </div>
            `;
            eachRecipe.querySelector('.js-add-tool-tip-container').innerHTML = '';
            document.querySelector('.js-ingredients-input').focus();

            eachRecipe.querySelector('.js-ingredients-input-add-button')
            .addEventListener('click', () => {
              let finalIngredientsHtml = '';
              let eachIngredientsInputElem = eachRecipe.querySelector('.js-ingredients-input');
              let eachIngredient = eachIngredientsInputElem.value;
              let ingredientsArr = reversedArr[index].ingredients;

              if (eachIngredientsInputElem.value !== '') {
                ingredientsArr.push(eachIngredient);
                eachIngredientsInputElem.value = '';

                // console.log(eachIngredient);
                // console.log(ingredientsArr);
  
                ingredientsArr.forEach((ingredient) => {
                  const ingedientListItem = `
                    <div class="ingredients-li-holder js-ingredients-li-holder">
                      <li>${ingredient}</li> 
                      <button class="ingredients-li-edit-button js-ingredients-li-edit-button" title="Edit Ingredient">/</button>
                    </div>
                  `; 
                  finalIngredientsHtml += ingedientListItem;
                });
                eachRecipe.querySelector('.js-ingredients-list').innerHTML = finalIngredientsHtml;

                // FOR INGREDIENTS DELETE BUTTON
                if (eachRecipe.querySelector('.js-ingredients-delete-button').classList.contains('ingredients-delete-button') === false) {
                  eachRecipe.querySelector('.js-ingredients-delete-button').classList.add('ingredients-delete-button');
                }
              }

              saveRecipeArray();
              document.querySelector('.js-ingredients-input').focus();
            });

            eachRecipe.querySelector('.js-ingredients-input-done-button')
            .addEventListener('click', () => {
              eachRecipe.querySelector('.js-ingredients-input-container').innerHTML = '';
            });

            // FOR KEYDOWN
            document.querySelector('.js-ingredients-input')
            .addEventListener('keydown', (event) => {
              if (event.key === 'Enter') {
                let finalIngredientsHtml = '';
                let eachIngredientsInputElem = eachRecipe.querySelector('.js-ingredients-input');
                let eachIngredient = eachIngredientsInputElem.value;
                let ingredientsArr = reversedArr[index].ingredients;
                if (eachIngredientsInputElem.value !== '') {
                  ingredientsArr.push(eachIngredient);
                  eachIngredientsInputElem.value = '';
                  // console.log(eachIngredient);
                  // console.log(ingredientsArr);
                  ingredientsArr.forEach((ingredient) => {
                    const ingedientListItem = `
                      <li>${ingredient}</li>
                    `; 
                    finalIngredientsHtml += ingedientListItem;
                  });
                  eachRecipe.querySelector('.js-ingredients-list').innerHTML = finalIngredientsHtml;
                  // FOR INGREDIENTS DELETE BUTTON
                  if (eachRecipe.querySelector('.js-ingredients-delete-button').classList.contains('ingredients-delete-button') === false) {
                    eachRecipe.querySelector('.js-ingredients-delete-button').classList.add('ingredients-delete-button');
                  }
                }
                saveRecipeArray();
                document.querySelector('.js-ingredients-input').focus();
              } else if (event.key === 'Escape') {
                eachRecipe.querySelector('.js-ingredients-input-container').innerHTML = '';
              }
            });
          }
        });
      });

      hideToolTip();
    });
  });

  document.querySelectorAll('.js-each-recipe').forEach((eachRecipe, index) => {
    let recipeName = eachRecipe.querySelector('.js-recipe-name');
    let stepsDeleteButton = eachRecipe.querySelector('.js-steps-delete-button');
    let ingredientsDeleteButton = eachRecipe.querySelector('.js-ingredients-delete-button');
    let indexInRecipeArr = reversedArr.length - 1 - index;
    let particularRecipe = recipeArray[indexInRecipeArr];

    // FOR RECIPE NAME EDITTING
    recipeName.addEventListener('click', () => {
      let valueThere = particularRecipe.recipeName;
      eachRecipe.querySelector('.js-recipe-name-holder').innerHTML = `
        <div class="recipe-name-edit-input-container">
          <input type="text" class="recipe-name-edit-input js-recipe-name-edit-input">
          <button class="recipe-name-edit-cancel-button js-recipe-name-edit-cancel-button">X</button>
          <button class="recipe-name-edit-done-button js-recipe-name-edit-done-button">+</button>
        </div>
      `;
      eachRecipe.querySelector('.js-recipe-name-edit-input').focus();
      eachRecipe.querySelector('.js-recipe-name-edit-input').value = valueThere;

      eachRecipe.querySelector('.js-recipe-name-edit-cancel-button')
      .addEventListener('click', () => {
        renderRecipeName();
      });

      eachRecipe.querySelector('.js-recipe-name-edit-done-button')
      .addEventListener('click', () => {
        if (eachRecipe.querySelector('.js-recipe-name-edit-input').value !== '') {
          particularRecipe.recipeName = eachRecipe.querySelector('.js-recipe-name-edit-input').value;
          saveRecipeArray();
          renderRecipeName();
        }
      });
      eachRecipe.querySelector('.js-recipe-name-edit-input')
      .addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && eachRecipe.querySelector('.js-recipe-name-edit-input').value !== '') {
          particularRecipe.recipeName = eachRecipe.querySelector('.js-recipe-name-edit-input').value;
          saveRecipeArray();
          renderRecipeName();
        } else if (event.key === 'Escape') {
          renderRecipeName();
        }
      });
    });
    

    // FOR STEPS DELETE BUTTON
    if (particularRecipe.steps.length === 0) {
      stepsDeleteButton.classList.remove('steps-delete-button');
    } else {
      stepsDeleteButton.classList.add('steps-delete-button');
    }

    stepsDeleteButton.addEventListener('click', () => {
      if (stepsDeleteButton.classList.contains('steps-delete-button')) {
        eachRecipe.querySelector('.js-delete-steps-message-container').innerHTML = `
          <div class="delete-steps-message-holder">
            <div class="delete-steps-message">
              <p>Want To Delete Steps?</p>
              <div class="delete-steps-button-container">
                <button class="js-yes-delete-steps-button">Yes</button>
                <button class="js-no-delete-steps-button">No</button>
              </div>
            </div>
          </div>
        `;

        eachRecipe.querySelector('.js-yes-delete-steps-button').addEventListener('click', () => {
          particularRecipe.steps = [];
          saveRecipeArray();
          renderRecipeName();
        });

        // FOR KEYDOWN.
        stepsDeleteButton.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            particularRecipe.steps = [];
            saveRecipeArray();
            renderRecipeName();
          }
        });

        eachRecipe.querySelector('.js-no-delete-steps-button').addEventListener('click', () => {
          eachRecipe.querySelector('.js-delete-steps-message-container').innerHTML = '';
        });
      }
    });

    // FOR THE STEPS EDITS
    eachRecipe.querySelectorAll('.js-steps-li-holder').forEach((eachLiHolder, index) => {
      let valueThere = particularRecipe.steps[index];
      eachLiHolder.querySelector('.js-steps-li-edit-button').addEventListener('click', () => {
        eachRecipe.querySelector('.js-steps-input-container').innerHTML = `
          <div class="steps-input-container">
            <input type="text" class="steps-edit-input js-steps-edit-input">
            <button class="steps-input-add-button js-steps-edit-input-done-button">+</button>
            <button class="steps-edit-input-cancel-button js-steps-edit-input-cancel-button" style="">x</button>
          </div>
        `;
        eachRecipe.querySelector('.js-steps-edit-input').value = valueThere;
        eachRecipe.querySelector('.js-steps-edit-input').focus();
        
        eachRecipe.querySelector('.js-steps-edit-input')
        .addEventListener('keyup', (event) => {
          if (event.key !== 'Enter') {
            eachLiHolder.querySelector('li').innerHTML = eachRecipe.querySelector('.js-steps-edit-input').value;
          }
        });

        eachRecipe.querySelector('.js-steps-edit-input-done-button')
        .addEventListener('click', () => {
          if (eachRecipe.querySelector('.js-steps-edit-input').value !== '') {
            particularRecipe.steps[index] = eachRecipe.querySelector('.js-steps-edit-input').value;
            eachRecipe.querySelector('.js-steps-input-container').innerHTML = '';
            saveRecipeArray();
          }
        });
        eachRecipe.querySelector('.js-steps-edit-input')
        .addEventListener('keydown', (event) => {
          if (event.key === 'Enter' && eachRecipe.querySelector('.js-steps-edit-input').value !== '') {
            particularRecipe.steps[index] = eachRecipe.querySelector('.js-steps-edit-input').value;
            eachRecipe.querySelector('.js-steps-input-container').innerHTML = '';
            saveRecipeArray();
          } else if (event.key === 'Escape') {
            eachLiHolder.querySelector('li').innerHTML = valueThere;
            eachRecipe.querySelector('.js-steps-input-container').innerHTML = '';
          }
        });

        eachRecipe.querySelector('.js-steps-edit-input-cancel-button')
        .addEventListener('click', () => {
          eachLiHolder.querySelector('li').innerHTML = valueThere;
          eachRecipe.querySelector('.js-steps-input-container').innerHTML = '';
        });
      });
    });


    // FOR INGREDIENTS DELETE BUTTON
    if (particularRecipe.ingredients.length === 0) {
      ingredientsDeleteButton.classList.remove('ingredients-delete-button');
    } else {
      ingredientsDeleteButton.classList.add('ingredients-delete-button');
    }

    ingredientsDeleteButton.addEventListener('click', () => {
      if (ingredientsDeleteButton.classList.contains('ingredients-delete-button')) {
        eachRecipe.querySelector('.js-delete-ingredients-message-container').innerHTML = `
          <div class="delete-ingredients-message-holder">
            <div class="delete-ingredients-message">
              <p>Want To Delete Ingredients?</p>
              <div class="delete-ingredients-button-container">
                <button class="js-yes-delete-ingredients-button">Yes</button>
                <button class="js-no-delete-ingredients-button">No</button>
              </div>
            </div>
          </div>
        `;

        eachRecipe.querySelector('.js-yes-delete-ingredients-button').addEventListener('click', () => {
          particularRecipe.ingredients = [];
          saveRecipeArray();
          renderRecipeName();
        });

        // FOR KEYDOWN.
        ingredientsDeleteButton.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            particularRecipe.ingredients = [];
            saveRecipeArray();
            renderRecipeName();
          }
        });

        eachRecipe.querySelector('.js-no-delete-ingredients-button').addEventListener('click', () => {
          eachRecipe.querySelector('.js-delete-ingredients-message-container').innerHTML = '';
        });
      }
    });
    
    // FOR THE INGREDIENTS EDITS
    eachRecipe.querySelectorAll('.js-ingredients-li-holder').forEach((eachLiHolder, index) => {
      // let valueThere = eachLiHolder.querySelector('li').innerHTML;
      let valueThere = particularRecipe.ingredients[index];
      eachLiHolder.querySelector('.js-ingredients-li-edit-button').addEventListener('click', () => {
        eachRecipe.querySelector('.js-ingredients-input-container').innerHTML = `
          <div class="ingredients-input-container">
            <input type="text" class="ingredients-edit-input js-ingredients-edit-input">
            <button class="ingredients-input-add-button js-ingredients-edit-input-done-button">+</button>
            <button class="ingredients-edit-input-cancel-button js-ingredients-edit-input-cancel-button">x</button>
          </div>
        `;
        eachRecipe.querySelector('.js-ingredients-edit-input').value = valueThere;
        eachRecipe.querySelector('.js-ingredients-edit-input').focus();
        
        eachRecipe.querySelector('.js-ingredients-edit-input')
        .addEventListener('keyup', (event) => {
          if (event.key !== 'Enter') {
            eachLiHolder.querySelector('li').innerHTML = eachRecipe.querySelector('.js-ingredients-edit-input').value;
          }
        });

        eachRecipe.querySelector('.js-ingredients-edit-input-done-button')
        .addEventListener('click', () => {
          if (eachRecipe.querySelector('.js-ingredients-edit-input').value !== '') {
            particularRecipe.ingredients[index] = eachRecipe.querySelector('.js-ingredients-edit-input').value;
            eachRecipe.querySelector('.js-ingredients-input-container').innerHTML = '';
            saveRecipeArray();
          }
        });
        eachRecipe.querySelector('.js-ingredients-edit-input')
        .addEventListener('keydown', (event) => {
          if (event.key === 'Enter' && eachRecipe.querySelector('.js-ingredients-edit-input').value !== '') {
            particularRecipe.ingredients[index] = eachRecipe.querySelector('.js-ingredients-edit-input').value;
            eachRecipe.querySelector('.js-ingredients-input-container').innerHTML = '';
            saveRecipeArray();
          } else if (event.key === 'Escape') {
            eachLiHolder.querySelector('li').innerHTML = valueThere;
            eachRecipe.querySelector('.js-ingredients-input-container').innerHTML = '';
          }
        })

        eachRecipe.querySelector('.js-ingredients-edit-input-cancel-button')
        .addEventListener('click', () => {
          eachLiHolder.querySelector('li').innerHTML = valueThere;
          eachRecipe.querySelector('.js-ingredients-input-container').innerHTML = '';
        });
      });
    });
  });
}


function changeMainInputButton() {
  document.querySelector('.js-recipe-input')
  .addEventListener('keydown', (event) => {
    if (/^[a-zA-Z]$/.test(event.key)) {
      document.querySelector('.js-recipe-input-control-button').innerHTML = '+';
      document.querySelector('.js-recipe-input-control-button').classList.remove('recipe-input-cancel-button');
      document.querySelector('.js-recipe-input-control-button').classList.add('recipe-input-add-button');
    }
  });

  document.querySelector('.js-recipe-input')
  .addEventListener('input', () => {
    if (document.querySelector('.js-recipe-input').value === '') {
      document.querySelector('.js-recipe-input-control-button').innerHTML = 'X';
      document.querySelector('.js-recipe-input-control-button').classList.add('recipe-input-cancel-button');
      document.querySelector('.js-recipe-input-control-button').classList.remove('recipe-input-add-button');
    }
  });
}


function changeEditText() {
  if (selected === 0) {
    document.querySelector('.js-edit-delete-button').innerHTML = 'x';
    document.querySelector('.js-edit-delete-button').classList.remove('show-delete-svg');
    document.querySelector('.js-cancel-button-container').innerHTML = '';
  } else if (selected > 0) {
    document.querySelector('.js-edit-delete-button').innerHTML = deleteSVG;
    document.querySelector('.js-edit-delete-button').classList.add('show-delete-svg');
    document.querySelector('.js-cancel-button-container').innerHTML = `
      <button class="cancel-button js-cancel-button">Cancel</button>
    `;
    document.querySelector('.js-cancel-button').addEventListener('click', () => {
      cancelOperation();
    });
  }
}


function cancelOperation() {
  selected = 0;

  document.querySelector('.js-edit-delete-button').innerHTML = '/';
  document.querySelector('.js-edit-delete-button').classList.remove('show-delete-svg');
  document.querySelector('.js-cancel-button-container').innerHTML = '';
  document.querySelector('.js-select-all-button-container').innerHTML = '';
  document.querySelectorAll('.js-checkbox-add-button-container').forEach((addButtonCheckboxElem) => {
    addButtonCheckboxElem.innerHTML = `
      <button class="each-recipe-add-button js-each-recipe-add-button">+</button>
    `;
  });
}


function selectorAll() {
  const checkboxes = document.querySelectorAll('.js-delete-checkbox');
  checkboxes.forEach((eachOne) => {
    if (eachOne.checked === false) {
      eachOne.checked = true;
      selected++;
    }
  });
  changeEditText();
}


function deselectAll() {
  const checkboxes = document.querySelectorAll('.js-delete-checkbox');
  checkboxes.forEach((eachOne) => {
    if (eachOne.checked === true) {
      eachOne.checked = false;
      selected--;
    }
  });
  changeEditText();
}


function deleteRecipe() {
  let reversedArr = recipeArray.slice().reverse(); 

  /*
  // DIDN'T REALLY WORK FOR MULTIPLE DELETION. 

  document.querySelectorAll('.js-delete-checkbox').forEach((eachCheckbox, index) => {
    let eachCheckboxContent = eachCheckbox.checked;
    if (eachCheckboxContent) {
      // renderRecipeName();
      reversedArr.splice(index, 1);
    }
    recipeArray = reversedArr.slice().reverse();
    renderRecipeName();
  });
  */

  const checkboxes = document.querySelectorAll('.js-delete-checkbox');
  const reversedCheckboxes = Array.from(checkboxes).reverse();
  reversedCheckboxes.forEach((eachCheckbox, index) =>{
    let eachCheckboxContent = eachCheckbox.checked;
    if (eachCheckboxContent) {
      let newIndex = reversedCheckboxes.length - 1 - index;
      reversedArr.splice(newIndex, 1);
    }
    recipeArray = reversedArr.slice().reverse();
    saveRecipeArray();
    renderRecipeName();
  });
}


function hideToolTip() {
  document.body.addEventListener('click', (event) => {
    if (toolTip) {
      if (event.target.classList.contains('js-each-recipe-add-button') === false) {
        document.querySelectorAll('.js-add-tool-tip-container').forEach((toolTipContainers) => {
          toolTipContainers.innerHTML = '';
        });
      }
    }
  });
}


function saveRecipeArray() {
  localStorage.setItem('recipeArray', JSON.stringify(recipeArray));
}