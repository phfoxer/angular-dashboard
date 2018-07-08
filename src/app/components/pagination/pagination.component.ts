import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


interface Page {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() data: Page;
  @Output() page = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }

  private paginate(n: number) {
    n = (n < 1) ? 1 : n;
    n = (n > this.data.total) ? this.data.total : n;
    this.data.current_page = n;
    this.page.emit(n);
  }

}
export default Page;
