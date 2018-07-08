import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'input-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  current: boolean;
  @Input() checked: boolean;
  @Output() value = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    if (this.checked === true) {
      this.current = true;
    }
  }

  setValueEmit(event: Event) {
    this.value.emit(this.current);
  }

}
