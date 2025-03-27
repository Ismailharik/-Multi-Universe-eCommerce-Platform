import { IMenuItem, IMobileType } from "@/types/menu-d-type";

export const menu_data:IMenuItem[] = [
  {
    id:1,
    link:'/home/food-universe',
    title:'All Universes',
    mega_menu:true,
    home_pages:[
      {
        id:1,
        title:'Food Products Universal',
        img:'/assets/img/menu/food-products.webp',
        link:'/home/food-universe'
      },
      {
        id:2,
        title:'Wooden Houses Universal',
        img:'/assets/img/menu/produit-constr.webp',
        link:'/home/wooden-houses-universe'

      },

    ]
  },
  {
    id:2,
    link:'/shop',
    title:'Shop',
    // mega_menu:true,
    shop_mega_menus:[
      {
        link:'/shop',
        title:'Shop Pages',
        list_menus:[]
      }, 
    ]
  },
  {
    id:5,
    link:'/contact',
    title:'Contact',
  },
]

