import { UsersService } from 'app/modules/users/users.service';
import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { routerTransition } from 'app/router.animation';
import { Event } from 'electron';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  animations: [routerTransition],
  providers: [UsersService],
})
export class TemplateComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

  menus: any[] = [];
  user: any;

  moduloAtual: IModulo = <IModulo>{};
  currentSearch: any[] = [];
  permissions: any;
  activedMenu: number;
  ramdom: string;
  searchInput: string;
  constructor(
    private storage: LocalStorage,
    private usersService: UsersService,
    public router: Router
  ) { }

  async ngOnInit() {
    this.ramdom = Math.random().toString(36).substring(7);
    await this.storage.getItem('userdata').subscribe((user) => {
      this.user = user;
    });
    await this.storage.getItem('modulo').subscribe((modulo) => {
      this.moduloAtual = modulo;
    });

    await this.initMenu();
    // this.loadLayout();
  }

  private async initMenu() {
    return new Promise((resolve, reject) => {
      this.storage.getItem('_menu_storage').subscribe((m) => {
        if (m) {
          this.menus = m;
          resolve(m);
        } else {
          reject([]);
        }
      });
    });
  }

  logout() {
    this.storage.clear().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }

  private loadLayout() {
    const left: HTMLElement = document.getElementById('left-side');
    const right: HTMLElement = document.getElementById('right-side');
    if ((<string>localStorage.getItem('layout')) === 'full') {
      left.setAttribute('style', 'display:none !important;');
      right.setAttribute('style', 'width:100% !important;');
    } else {
      left.setAttribute('style', 'display:visible !important;');
      right.setAttribute('style', 'width:82% !important;');
    }
  }

  extendLayout() {
    const ext: string = (!localStorage.getItem('layout')) ? 'compress' : localStorage.getItem('layout');
    const left: HTMLElement = document.getElementById('left-side');
    const right: HTMLElement = document.getElementById('right-side');
    if (ext === 'compress') {
      left.setAttribute('style', 'display:none !important;');
      right.setAttribute('style', 'width:100% !important;');
      localStorage.setItem('layout', 'full');
    } else {
      left.setAttribute('style', 'display:visible !important;');
      right.setAttribute('style', 'width:82% !important;');
      localStorage.setItem('layout', 'compress');
    }
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  async findInMenu(search: string = '') {
    this.currentSearch = [];
    if (search === '') {
      await this.initMenu();
    } else {
      await this.initMenu();
      await this.searchMenu(this.menus, search);
      this.menus = this.currentSearch;
    }
  }

  private async searchMenu(array: any, item: string) {
    await array.forEach(async element => {
      if (element.name.toLowerCase().indexOf(item.toLowerCase()) > -1 && element.link !== null) {
        this.currentSearch.push(element);
      } else {
        if (element.soons && element.soons.length > 0 && element.link === null) {
          return await this.searchMenu(element.soons, item);
        }
      }
    });
  }

  public searchClear() {
    this.searchInput = '';
    this.findInMenu('');
  }

  /**
   * browseImage
   */
  public browseImage(): void {
    const event = new MouseEvent('click', { bubbles: false });
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  /**
   * changePick
   */
  public async changePick(e: Event): Promise<void> {
    const t = <HTMLInputElement>e.target;
    const file: any = await t.files[0];
    //  this.user.image_url = 'assets/image/spinner.gif';
    const reader = new FileReader();

    if (t.files && t.files.length > 0) {
      reader.onload = (event: any) => {
        this.user.image_url = event.target.result;
        const data = {
          name: file.name,
          type: file.type,
          value: reader.result.split(',')[1]
        };
        this.usersService.upload({ file: data });
      };
      reader.readAsDataURL(file);
    }
  }

  @HostListener('keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.searchClear();
    }
  }

}
