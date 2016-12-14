import { Ingredient } from './../ingredient';
import { Injectable } from '@angular/core';



@Injectable()
export class ShoppingListService {
  private items: Ingredient[] = [];

  getItems(){
    return this.items;
  }

  addItems(items: Ingredient[]){
    Array.prototype.push.apply(this.items, items);
  }

  addItem(item: Ingredient){
    this.items.push(item);
    // this.items.unshift(item);
  }

  editItem(oldItem: Ingredient, newItem: Ingredient){
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  deleteItem(item: Ingredient){
    this.items.splice(this.items.indexOf(item), 1);
  }

  constructor() { }

}
