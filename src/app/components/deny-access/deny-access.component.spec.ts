import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyAccessComponent } from './deny-access.component';

describe('DenyAccessComponent', () => {
  let component: DenyAccessComponent;
  let fixture: ComponentFixture<DenyAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenyAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
