import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {
  @Input() load: boolean;
  constructor() { }

  ngOnInit() {
  }

}
