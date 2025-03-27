import { Component } from '@angular/core';

@Component({
  selector: 'app-instagram-area-two',
  templateUrl: './instagram-area-two.component.html',
  styleUrls: ['./instagram-area-two.component.scss']
})
export class InstagramAreaTwoComponent {

  public instagram_data = [
    { id: 1, link: "https://www.instagram.com/", img: '/assets/img/instagram/2/insta-1.jpg' },
    { id: 2, link: "https://www.instagram.com/", img: '/assets/img/instagram/2/insta-2.jpg' },
    { id: 3, link: "https://www.instagram.com/", banner: true, img: '/assets/img/instagram/2/insta-icon.png' },
    { id: 4, link: "https://www.instagram.com/", img: '/assets/img/instagram/2/insta-3.jpg' },
    { id: 5, link: "https://www.instagram.com/", img: '/assets/img/instagram/2/insta-4.jpg' },
  ]
}
