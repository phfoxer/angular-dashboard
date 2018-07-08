import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionActionListComponent } from './permissionAction-list.component';

describe('PermissionActionListComponent', () => {
  let component: PermissionActionListComponent;
  let fixture: ComponentFixture<PermissionActionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionActionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
