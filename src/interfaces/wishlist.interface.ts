import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";
import { ISubcategory } from "./subcategory.interface";

export interface IWishlistResponse {
  status: string;
  count: number;
  data: IWishlist[];
}

export interface IWishlist {
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  subcategory: ISubcategory[];
  id: string;
}
