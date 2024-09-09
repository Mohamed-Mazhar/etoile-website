import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

export declare type IconType = 'email' | 'add' | null

@Component({
  selector: 'primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})

export class PrimaryButtonComponent implements OnInit {

  @Input() title!: string
  @Input() enabled = true
  @Input() withEnterKey = false
  @Input() loading: boolean = false
  @Input() iconType: IconType = null
  @Input() enableKeyboardEvent: boolean = true
  @Input() showArrow: boolean = false
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>()

  constructor() {
  }

  ngOnInit(): void {

  }

  isButtonEnabled(): string {
    if (!this.enabled || this.loading) {
      return 'disabled'
    } else {
      return ''
    }
  }

  get icon(): string {
    return ''
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.withEnterKey) {
      if (event.key === "Enter") {
        if (this.enabled && !this.loading && this.enableKeyboardEvent) {
          this.onClick.emit()
        }
      }
    }
  }

}
