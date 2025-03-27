import { Component } from '@angular/core';

@Component({
  selector: 'app-instagram-area-one',
  templateUrl: './instagram-area-one.component.html',
  styleUrls: ['./instagram-area-one.component.scss']
})
export class InstagramAreaOneComponent {

   // instagram data
   public instagram_data = [
    {
      id: 1,
      link: 'https://www.instagram.com/',
      img: '/assets/img/instagram/instagram-1.jpg',
    },
    {
      id: 2,
      link: 'https://www.instagram.com/',
      img: '/assets/img/instagram/instagram-2.jpg',
    },
    {
      id: 3,
      link: 'https://www.instagram.com/',
      img: '/assets/img/instagram/instagram-3.jpg',
    },
    {
      id: 4,
      link: 'https://www.instagram.com/',
      img: '/assets/img/instagram/instagram-4.jpg',
    },
    {
      id: 5,
      link: 'https://www.instagram.com/',
      img: '/assets/img/instagram/instagram-5.jpg',
    },
  ];
}
