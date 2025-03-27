import { Component } from '@angular/core';
import feature_data, { IFeature } from '@/data/feature-data';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-beauty',
  templateUrl: './beauty.component.html',
  styleUrls: ['./beauty.component.scss']
})
export class BeautyComponent {

  // featured_data
  public featured_data = [
    {
      id: 1,
      img: "/assets/img/banner/wooden-houses-banners/home-banner-1.jpg",
      title: 'CROQUIS INTÉRIEUR',
      subtitle: 'Tous types de bâtiments en conception schématique ou en conception de travail.',
      save: 72,
    },
    {
      id: 2,
      img: "/assets/img/banner/wooden-houses-banners/home-banner-2.jpg",
      title: 'MODÉLISATION 3Dh',
      subtitle: 'Une gamme complète de modélisation intérieure en 3D.',
      save: 98,
    },
    {
      id: 3,
      img: "/assets/img/banner/wooden-houses-banners/home-banner-3.jpg",
      title: 'MESURE DE LA PIÈCE',
      subtitle: 'Élaboration d’un design parfait du projet.',
      save: 133,
    },
    {
      id: 4,
      img: "/assets/img/banner/wooden-houses-banners/home-banner-4.jpg",
      title: 'PLAN EN 2D',
      subtitle: 'Nous fournissons des plans en 2D pour une excellente visualisation.',
      save: 133,
    },
  ]

  // best sell products
  public products: IProduct[] = [];
  public feature_items:IFeature[] = feature_data;
  selectedImage: string | null = null;

  constructor(private sanitizer: DomSanitizer,public productService:ProductService) {
    this.productService.products.subscribe((products) => {
      this.products = products.filter((p) => p.productType === "beauty")
      .slice()
      .sort((a, b) => (b.sellCount ?? 0) - (a.sellCount ?? 0))
      .slice(0, 8);
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // instagram data
  public instagram_data = [
    { id: 1, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-1.jpg' },
    { id: 2, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-2.jpg' },
    { id: 3, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-3.jpg' },
    { id: 4, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-4.jpg' },
    { id: 5, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-5.jpg' },
    { id: 6, link: "https://www.instagram.com/", img: '/assets/img/instagram/3/instagram-6.jpg' },
  ]



  openFullScreenImage(imageSrc: string) {
    console.log("--->",imageSrc);
    this.selectedImage = imageSrc;
  }

  closeFullScreenImage() {
    this.selectedImage = null;
  }
}
