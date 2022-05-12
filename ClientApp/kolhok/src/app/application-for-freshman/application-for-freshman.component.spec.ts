import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationForFreshmanComponent } from './application-for-freshman.component';

describe('ApplicationForFreshmanComponent', () => {
  let component: ApplicationForFreshmanComponent;
  let fixture: ComponentFixture<ApplicationForFreshmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationForFreshmanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationForFreshmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
