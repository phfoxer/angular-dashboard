import { Component, OnInit } from '@angular/core';
import { GeneralHelper } from 'app/helpers/general.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: any;
  pagination: any;
  loaded: boolean;
  constructor(private generalHelper: GeneralHelper) {  }

  ngOnInit() {
    this.loaded = true;
    setTimeout(() => {
      this.users = new Array(20);
      this.loaded = false;
    }, 2000);
    this.pagination = {
      total: 160,
      current_page: 1,
      last_page: (160 / 20),
      per_page: 20
    };
  }

  paginate(event: any) {
    this.loaded = true;
    setTimeout(() => {
      this.loaded = false;
    }, 1000);
  }

  printIt(element: string) {
    this.generalHelper.generalPrint(element);
  }

}
