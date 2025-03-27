import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import categoryData from "@/data/category-data";
import { ImageModalComponent } from '../../image-modal/image-modal.component';
const categoryItems = categoryData.filter(c => c.productType === "beauty");
declare var bootstrap: any;


@Component({
  selector: 'app-beauty-category',
  templateUrl: './beauty-category.component.html',
  styleUrls: ['./beauty-category.component.scss']
})
export class BeautyCategoryComponent {
  @ViewChild(ImageModalComponent) imageModal!: ImageModalComponent;

  categoryItems = [
    {
      id: "64240ca8253d81bc860d4cf4",
      img: "/assets/img/banner/wooden-houses-banners/home-banner-1.jpg",
      parent: "Plain-Pied MT – Maison Passive Traditionnelle",
      children: [
        "Skin",
        "Lip Liner"
      ],
      productType: "beauty",
      products: [
        "642515c0253d81bc860d4da3",
        "6426ab33253d81bc860d5f86"
      ],
      status: "Show"
    },
    {
      id: "64240ca8253d81bc860d4cf4",
      img: "/assets/img/banner/wooden-houses-banners/home-banner-2.jpg",
      parent: "Etage MT – Maison Passive Traditionnelle",
      children: [
        "Skin",
        "Lip Liner"
      ],
      productType: "beauty",
      products: [
        "642515c0253d81bc860d4da3",
        "6426ab33253d81bc860d5f86"
      ],
      status: "Show"
    },
    {
      id: "64240ca8253d81bc860d4cf4",
      img: "/assets/img/banner/wooden-houses-banners/home-banner-3.jpg",
      parent: "Comble Aménagé MT – Maison Passive Traditionnelle",
      children: [
        "Skin",
        "Lip Liner"
      ],
      productType: "beauty",
      products: [
        "642515c0253d81bc860d4da3",
        "6426ab33253d81bc860d5f86"
      ],
      status: "Show"
    },
    {
      id: "64240ca8253d81bc860d4cf4",
      img: "/assets/img/banner/wooden-houses-banners/home-banner-4.jpg",
      parent: "Plain Pied MC – Maison Passive contemporaine",
      children: [
        "Skin",
        "Lip Liner"
      ],
      productType: "beauty",
      products: [
        "642515c0253d81bc860d4da3",
        "6426ab33253d81bc860d5f86"
      ],
      status: "Show"
    },
    {
      id: "64240ca8253d81bc860d4cf4",
      img: "/assets/img/banner/wooden-houses-banners/home-banner-5.jpg",
      parent: "Etage MC – Maison Passive contemporaine",
      children: [
        "Skin",
        "Lip Liner"
      ],
      productType: "beauty",
      products: [
        "642515c0253d81bc860d4da3",
        "6426ab33253d81bc860d5f86"
      ],
      status: "Show"
    },
    {
      id: "64240ca8253d81bc860d4cf4",
      img: "/assets/img/banner/wooden-houses-banners/home-banner-6.jpg",
      parent: "Module Bureau – Module ossature",
      children: [
        "Skin",
        "Lip Liner"
      ],
      productType: "beauty",
      products: [
        "642515c0253d81bc860d4da3",
        "6426ab33253d81bc860d5f86"
      ],
      status: "Show"
    },
    {
      id: "64240ca8253d81bc860d4cf4",
      img: "/assets/img/banner/wooden-houses-banners/home-banner-7.jpg",
      parent: "Micro-Maison – Module ossature",
      children: [
        "Skin",
        "Lip Liner"
      ],
      productType: "beauty",
      products: [
        "642515c0253d81bc860d4da3",
        "6426ab33253d81bc860d5f86"
      ],
      status: "Show"
    },
    {
      id: "64240ca8253d81bc860d4cf4",
      img: "/assets/img/banner/wooden-houses-banners/home-banner-8.jpg",
      parent: "Nos crèches de demain",
      children: [
        "Skin",
        "Lip Liner"
      ],
      productType: "beauty",
      products: [
        "642515c0253d81bc860d4da3",
        "6426ab33253d81bc860d5f86"
      ],
      status: "Show"
    },
  ];

  selectedImage: string | null = null;

  constructor(private router: Router,) {}

  ngOnInit(): void {}

  openModal(imageSrc: string) {
    console.log("imageSrc", imageSrc)
    this.selectedImage = imageSrc;
    this.imageModal.open();
  }


  handleParentCategory(value: string): void {
    const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
    this.router.navigate(['/shop'], { queryParams: { category: newCategory } });
  }

}