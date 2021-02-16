import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();

  private recipes: Recipe[] = [
    // new Recipe(
    //     'Chicken Enchilada', 
    //     "Rita's family favourite chicken enchilada", 
    //     'https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg',
    //     [
    //         new Ingredient('Chicken breast', 1),
    //         new Ingredient('Black beans', 20),
    //         new Ingredient('Peppers', 3),
    //         new Ingredient('Spicy sauce', 1)
    //     ]),
    // new Recipe('Grilled Turkish-Style Chicken Wings', 
    // 'A new spicy treatment for chicken wings!', 
    // 'https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13-750x563.jpg',
    // [
    //     new Ingredient('Turkish hot pepper paste', 1),
    //     new Ingredient('Chicken wings', 15),
    //     new Ingredient('Paprika', 5),
    //     new Ingredient('Garlic ', 4)
    // ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //   this.slService.addIngredients(ingredients);
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
