import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() data: any;
  @Input() header: any[] = new Array;
  @Input() updateLink: string;
  @Output() delete = new EventEmitter<boolean>();
  public modalConfirm: any;
  public gridIds: number[] = new Array();
  constructor() {

  }

  ngOnInit() {
    if (this.header && this.header.length === 0) {
      alert(1);
    }
  }

  public toArray(obj: any): Array<any> {
    const array = Object.values(obj);
    if (array.length > 0) {
      const id = <number>array[0];
      this.gridIds.push(id);
      array.splice(0, 1);
    }
    return array;
  }


  deleteIt(e: Event, data: any) {
    this.modalConfirm = false;
    setTimeout(() => {
      this.modalConfirm = {
        title: 'Apagar registro',
        text: 'Deseja excluir definitivamente esse registro?'
      };
    }, 200);
    e.stopPropagation();
  }

  sendDeleteConfirmation(confirme: boolean) {
    this.delete.emit(confirme);
  }

}
