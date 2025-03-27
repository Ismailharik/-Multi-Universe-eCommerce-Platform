import { Component,Input, OnInit } from '@angular/core';
import { IMobileType } from '@/types/menu-d-type';
import { UtilsService } from '@/shared/services/utils.service';
import { CategoryService } from '@/shared/services/category.service';
import { ICategory, UNIVERSES } from '@/types/category-type';

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent implements OnInit {
  

  @Input () product_type!:string;

  public mobile_menu: IMobileType[] =[];
  public isCategoryActive:boolean = false;
  public openCategory:string = '';
  public isActiveMenu:string = '';
  public isToggleActive:string = '';

  category_data!:any[]





  constructor(public utilsService:UtilsService, private categoryService:CategoryService) {
  }
  ngOnInit(): void {
  this.getAllCategories()
  this.prepareMobileMenuData()
  }

  toggleCategoryActive() {
    this.isCategoryActive = !this.isCategoryActive;
  }


  handleOpenSubMenu(title: string) {
    this.isActiveMenu = (this.isActiveMenu === title) ? '' : title;
  }

  handleOpenSubCategory (title: string)  {
    if (title === this.openCategory) {
      this.openCategory = "";
    } else {
      this.openCategory = title;
    }
  };

  handleToggleActive = (type: string) => {
    if (type === this.isToggleActive) {
      this.isToggleActive = "";
    } else {
      this.isToggleActive = type;
    }
  };

  prepareMobileMenuData() {
    // add All Universes
    this.mobile_menu.push(  {
      id: 1,
      homes: true,
      title: 'All Universes',
      link: '/home/food-universe',
      home_pages: [
        {
          id:1,
          title:'Food Products', 
          img:'/assets/img/menu/menu-home-1.png',
          link:'/home/food-universe'
        },
        {
          id:2,
          title:'Wooden Houses',
          img:'/assets/img/menu/menu-home-2.jpg',
          link:'/home/wooden-houses-universe'
        },
      ]
    })
    
    //add shop
    this.mobile_menu.push({
      id: 1,
      title: 'Shop',
      link: '/shop',
    })
  }


getAllCategories(){
  this.categoryService.getCategoriesByParent(UNIVERSES.FOOD_PRODUCTS)
  .subscribe({
    next: (res) => {
    this.category_data= res.map((c) => ({id : c.id, title: c.name, link: `/shop/?categoryId=/${c.id}`, img: c.img, productType: c.parent,status: "Show"}))
  },
    error: (err) => console.log(err),
  })
}
}