import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-up-btn',
  templateUrl: './scroll-up-btn.component.html',
  styleUrls: ['./scroll-up-btn.component.scss']
})
export class ScrollUpBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  showButton = false; // Button is initially hidden
  scrollPosition = 0;

  // This listener tracks the scroll event
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const scrollTrigger = 200; // The number of pixels to scroll before showing the button

    if (yOffset > scrollTrigger) {
      this.showButton = true; // Show button when scrolled past the trigger point
    } else {
      this.showButton = false; // Hide button when scrolled back to the top
    }
  }

  // Scroll to the top when the button is clicked
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
