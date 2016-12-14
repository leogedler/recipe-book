import { RecipeService } from './recipes/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onStore(){
    this.recipeService.storeData().subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

  onFetch(){
    this.recipeService.fetchData();
  }

}
