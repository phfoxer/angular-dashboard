import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionTypeListComponent } from './permissionType-list.component';

describe('PermissionTypeListComponent', () => {
  let component: PermissionTypeListComponent;
  let fixture: ComponentFixture<PermissionTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
