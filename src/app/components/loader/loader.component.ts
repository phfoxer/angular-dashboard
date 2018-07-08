import { Component, OnInit, Input } from '@angular/core';
import { language } from 'app/language';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  language: any;
  @Input() load: boolean;
  constructor() {
    this.language = language;
   }

  ngOnInit() { }

}
