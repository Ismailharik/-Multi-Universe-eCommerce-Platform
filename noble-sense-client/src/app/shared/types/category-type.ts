export interface ICategory {
  id: number;
  description: string;
  name: string;
  numberOfProducts:number
  img: string;
  parent: string;
}

export enum UNIVERSES {
  //parents
  FOOD_PRODUCTS = 'produits-alimentaires',
}
