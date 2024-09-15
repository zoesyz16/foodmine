import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { SearchComponent } from "../../partials/search/search.component";
import { TagsComponent } from "../../partials/tags/tags.component";
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, StarRatingComponent, CurrencyPipe, SearchComponent, TagsComponent, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods: Food[] = [];
  constructor(private foodService:FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if (params.tag)
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      else
        foodsObservable = foodService.getAll();
      foodsObservable.subscribe((serverFoods) => {this.foods = serverFoods;})
    })
  }

}
