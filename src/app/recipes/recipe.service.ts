import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe';
import { Ingredient } from "../ingredient";
import { Headers, Http, Response} from '@angular/http';
import { Observable, Subscription } from "rxjs/Rx";
import 'rxjs/Rx';


@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private  recipes: Recipe[] = [
    new Recipe('Arepa', 'Very tasty', 'http://www.amaizeyou.com/images/galleryfull/perico_arepa.jpg', [
      new Ingredient('Corn flour', 1),
      new Ingredient('Salt', 2)
    ]),
    new Recipe('Cachapa', 'Super tasty', 'https://i.ytimg.com/vi/4W4z6eFOMwQ/maxresdefault.jpg', [
      new Ingredient('Corn', 2),
      new Ingredient('Butter', 1)
    ])
  ];

  constructor(private http: Http) { }

  getRecipes(){
    return this.recipes
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe){
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData(){
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    return this.http.put('https://recipebook-983b1.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData(){
    return this.http.get('https://recipebook-983b1.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {

          console.log(data);
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      )
  }

}
