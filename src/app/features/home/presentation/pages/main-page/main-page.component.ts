import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  // This is the array of items you want to pass to the child component
  section1 = [
    { title: 'Swiss Black Forest Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img1.png' },
    { title: 'Carrot Cake Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img2.png' },
    { title: 'Red Velvet Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img3.png' },
    { title: 'Swiss Black Forest Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img1.png' },
    { title: 'Carrot Cake Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img2.png' },
    { title: 'Red Velvet Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section1-img3.png' }
  ];

  section2 = [
    { title: 'Rocher Torte 24', subtitle: '470 EGP', image: 'assets/images/home-asset/section2-img1.png' },
    { title: 'Four Seasons Torte 24', subtitle: '440 EGP', image: 'assets/images/home-asset/section2-img2.png' },
    { title: 'Knafeh with Mango Large Platter', subtitle: '230 EGP', image: 'assets/images/home-asset/section2-img3.png' },
    { title: 'Swiss Black Forest Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section2-img1.png' },
    { title: 'Carrot Cake Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section2-img2.png' },
    { title: 'Red Velvet Gâteau', subtitle: '35 EGP', image: 'assets/images/home-asset/section2-img3.png' }
  ];



  constructor() { }

  ngOnInit(): void {
  }

}
