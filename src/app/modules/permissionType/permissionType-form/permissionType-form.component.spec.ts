import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionTypeFormComponent } from './permissionType-form.component';

describe('PermissionTypeFormComponent', () => {
  let component: PermissionTypeFormComponent;
  let fixture: ComponentFixture<PermissionTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
