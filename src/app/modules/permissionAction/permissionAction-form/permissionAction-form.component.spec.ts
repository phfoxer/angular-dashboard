import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionActionFormComponent } from './permissionAction-form.component';

describe('PermissionActionFormComponent', () => {
  let component: PermissionActionFormComponent;
  let fixture: ComponentFixture<PermissionActionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionActionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
