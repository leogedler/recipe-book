import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private isNew = true;
  private recipeIndex: number;
  private recipe: Recipe;
  private subcription: Subscription;

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.subcription = this.route.params.subscribe(
      (params:any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        } else {
          this.isNew = true;
          this.recipe = null;
        }

        this.initForm();
      }
    );
  }

  onSubmit(){
    const newRecipe = this.recipeForm.value;

    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }

    this.navigateBack();
  }

  onCancel(){
    this.navigateBack();
  }

  onAddItem(name: string, amount: string){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
    new FormGroup({
      name: new FormControl(name, Validators.required ),
      amount: new FormControl(+amount, [
        Validators.required,
        Validators.pattern("\\d+")
        ] )
    })
    );
  }

  onRemoveItem(index: number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

  private initForm(){
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew) {
      if (this.recipe.hasOwnProperty('ingredients')) {
        for (let index = 0; index < this.recipe.ingredients.length; index++) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[index].name, Validators.required ),
              amount: new FormControl(this.recipe.ingredients[index].amount, [
                Validators.required,
                Validators.pattern("\\d+")
                ] )
            })
          );
        }
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;      
    }
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    })

  }

  private navigateBack(){
    this.router.navigate(['../'])
  }

}
