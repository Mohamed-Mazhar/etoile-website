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


  mostTrendy = [
    { title: 'Hazelnut Basbousa', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/dcc43c57-b7f3-41ee-b9c4-55ab353434bc-638030120296342920.png' },
    { title: 'Plain Basbousa', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/385a1c2b-d4f3-4d1a-9124-1fad37997efb-638030126475036389.png' },
    { title: 'Baklava with Nuts', subtitle: '320 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/2f180a9f-c3e7-4024-94a8-03ce288eaa64-638030129621863268.png' },
    { title: 'Goulash with Nuts', subtitle: '320 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/ecac21f2-0129-418e-b577-9cd86f173ea3-638030134783961213.png' },
    { title: 'Hazelnut Basbousa', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/dcc43c57-b7f3-41ee-b9c4-55ab353434bc-638030120296342920.png' },
    { title: 'Plain Basbousa', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/385a1c2b-d4f3-4d1a-9124-1fad37997efb-638030126475036389.png' },
    { title: 'Baklava with Nuts', subtitle: '320 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/2f180a9f-c3e7-4024-94a8-03ce288eaa64-638030129621863268.png' },
    { title: 'Goulash with Nuts', subtitle: '320 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/ecac21f2-0129-418e-b577-9cd86f173ea3-638030134783961213.png' },
    { title: 'Hazelnut Basbousa', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/dcc43c57-b7f3-41ee-b9c4-55ab353434bc-638030120296342920.png' },
    { title: 'Plain Basbousa', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/385a1c2b-d4f3-4d1a-9124-1fad37997efb-638030126475036389.png' },
    { title: 'Baklava with Nuts', subtitle: '320 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/2f180a9f-c3e7-4024-94a8-03ce288eaa64-638030129621863268.png' },
    { title: 'Goulash with Nuts', subtitle: '320 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/ecac21f2-0129-418e-b577-9cd86f173ea3-638030134783961213.png' },
    { title: 'Hazelnut Basbousa', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/dcc43c57-b7f3-41ee-b9c4-55ab353434bc-638030120296342920.png' },
    { title: 'Plain Basbousa', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/385a1c2b-d4f3-4d1a-9124-1fad37997efb-638030126475036389.png' },
    { title: 'Baklava with Nuts', subtitle: '320 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/2f180a9f-c3e7-4024-94a8-03ce288eaa64-638030129621863268.png' },
    { title: 'Goulash with Nuts', subtitle: '320 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/ecac21f2-0129-418e-b577-9cd86f173ea3-638030134783961213.png' },
  ]


  newArrival = [
    { title: 'Duetto Fruits & Dark Torte 24', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/a33900e7-43a4-49eb-82b8-6d2c51b004f5-638120645835496903.jpg' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'Vanilla Gâteau', subtitle: '27 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/38adb3f2-082e-4d87-bcd4-e056549367be-638090467773167369.png' },
    { title: 'Duetto Fruits & Dark Torte 24', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/a33900e7-43a4-49eb-82b8-6d2c51b004f5-638120645835496903.jpg' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'Vanilla Gâteau', subtitle: '27 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/38adb3f2-082e-4d87-bcd4-e056549367be-638090467773167369.png' },
    { title: 'Duetto Fruits & Dark Torte 24', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/a33900e7-43a4-49eb-82b8-6d2c51b004f5-638120645835496903.jpg' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'Vanilla Gâteau', subtitle: '27 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/38adb3f2-082e-4d87-bcd4-e056549367be-638090467773167369.png' },
    { title: 'Duetto Fruits & Dark Torte 24', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/a33900e7-43a4-49eb-82b8-6d2c51b004f5-638120645835496903.jpg' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'Vanilla Gâteau', subtitle: '27 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/38adb3f2-082e-4d87-bcd4-e056549367be-638090467773167369.png' },
    { title: 'Duetto Fruits & Dark Torte 24', subtitle: '220 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/a33900e7-43a4-49eb-82b8-6d2c51b004f5-638120645835496903.jpg' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
    { title: 'White Honey Cake', subtitle: '50 EGP', image: 'https://linktsp.blob.core.windows.net/xretoile/6199ef08-cfe9-43c9-af5c-1240ecde803d-638440449683223069.png' },
  ]


  constructor() { }

  ngOnInit(): void {
  }



}
