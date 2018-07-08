import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Title } from '@angular/platform-browser';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private _electronService: ElectronService,
    private storage: LocalStorage,
    private pageTitle: Title
  ) {

    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'ptbr');
    }

    this.storage.getItem('userdata').subscribe((user) => {
      if (user) {
        this.pageTitle.setTitle(user.empresa.empresa.fantasia);
      }
    });

  }

  launchWindow() {
    this._electronService.shell.openExternal('https://google.com');
  }

}
