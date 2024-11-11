const models = require('../models/recipeModel.js');

const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

const liquorList = ['tequila', 'vodka', 'gin', 'rum', 'cognac', 'amaretto', 'vermouth', 'kahlua', 'whiskey'];
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log('GOT THIS DATA');
    console.log(data);
    let allDrinks = [];
    for (let i = 0; i < data.drinks.length; i++) {
      allDrinks.push(parseDataToDatabaseObject(data.drinks[i]));
    }
    allDrinks;
    console.log('INSERTING>>>>>');
    console.log(allDrinks);
    models.Recipe.insertMany(allDrinks);
  });

const parseDataToDatabaseObject = (data) => {
  // Map API data to our database object
  const ret = {};
  let ingredients = [];
  let amounts = [];
  let liquor = '?';
  for (let i = 1; i <= 15; i++) {
    let tempIngredient = data[`strIngredient${i}`];
    if (tempIngredient == null) {
      continue;
    }
    ingredients.push(tempIngredient);

    let tempAmount = data[`strMeasure${i}`];
    if (tempAmount != null) {
      amounts.push(`${tempAmount} ${tempIngredient}`);
    } else {
      amounts.push(tempIngredient);
    }
    for (let i = 0; i < liquorList.length; i++) {
      if (tempIngredient.toLowerCase().includes(liquorList[i]) && liquor === '?') {
        liquor = liquorList[i];
      }
    }
  }
  // Assign data to database object
  ret.name = data.strDrink;
  ret.liquor = liquor;
  ret.ingredients = ingredients;
  ret.recipe = amounts;
  ret.instruction = data.strInstructions;

  if (!data.strIBA) {
    if (!data.strCategory || !data.strGlass) {
      ret.description = 'No description found';
    } else {
      ret.description = `An ${data.strCategory} usually served in a(n) ${data.strGlass}`;
    }
  } else {
    if (!data.strCategory || !data.strGlass) {
      ret.description = 'No description found';
    } else {
      ret.description = `An ${data.strCategory} from the category ${data.strIBA} usually served in a(n) ${data.strGlass}`;
    }
  }

  ret.image = data.strDrinkThumb;

  return ret;
};

// recipes: An array of recipes for liquors.
// id: The unique identifier of the liquor recipe
// liquor: The main Liquor used in this drink.
// ingredients:an array of ingredients in searchable format.
// Recipe: an array of ingredients and their amounts.
// name: The name of the recipe.
// instructions: Steps for crafting this cocktail.
// description: A brief description of the cocktail.
// image: A url image for the liquor.
