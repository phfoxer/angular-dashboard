import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

declare var $: any;
@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  open: boolean = false;
  item: any;
  itemsAux: any;
  value: string;
  search: string;
  constructor() {

  }
  @Input() items: any;
  @Input() label: string;
  @Input() active: number;
  @Output() selected = new EventEmitter<any>();
  hash: number;

  ngOnChanges(changes: SimpleChanges) {
    if (this.items && this.items.length > 0) {
      const current = this.items.filter(v => {
        return (Number(v.id) === this.active) ? v : null;
      });
      this.value = (current.length > 0) ? current[0].name : null;
    }
  }

  ngOnInit() {
    this.hash = Math.floor(Math.random() * 6) + 1;
  }

  openOptions() {
    if (!this.itemsAux) {
      this.itemsAux = this.items;
    }
    $('#selectModal' + this.hash).modal('show');
  }

  selectedEmit(item: any) {
    this.item = item;
    this.value = item.name;
    this.active = item.id;
    this.open = true;
    this.selected.emit(item);
    $('#selectModal' + this.hash).modal('hide');
  }

  find() {
    if (this.search !== '') {
      this.items = this.itemsAux.filter((item: any) => {
        if (item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
          return item;
        }
      });
    } else {
      this.items = this.itemsAux;
    }
  }

  clear() {
    this.item = this.value = null;
  }


  ngOnDestroy() {
    this.itemsAux = undefined;
    this.search = null;
    this.value = null;
    this.item = undefined;
    this.open = false;
  }

}
