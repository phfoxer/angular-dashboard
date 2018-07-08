import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

interface Modal {
  title: string;
  text: string;
  show: boolean;
  id: number;
}

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
  @Input() question: Modal;
  @Output() answer = new EventEmitter<{ id: number; confirm: boolean }>();
  constructor() { }
  ngOnInit() {
    if (this.question.show) {
      $('#confirmModal').modal('show');
    }
  }
  confirme(confirm: boolean) {
    this.answer.emit({ id: this.question.id, confirm: confirm });
  }
}
