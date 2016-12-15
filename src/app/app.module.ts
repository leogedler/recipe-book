
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
// import { ShoppingListModule } from './shopping-list/shopping-list.module'; **** Lazy loading
// import { RecipesModule } from './recipes/recipes.module'; **** Lazy loading

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { DropdownDirective } from './dropdown.directive';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { routing } from "./app.routing";
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    // ShoppingListModule // Shopping list module created **** Lazy loading
    // RecipesModule // Recipes module created **** Lazy loading
  ],
  providers: [RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
