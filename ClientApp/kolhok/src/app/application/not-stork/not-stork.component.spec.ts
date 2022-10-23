import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotStorkComponent } from './not-stork.component';

describe('NotStorkComponent', () => {
  let component: NotStorkComponent;
  let fixture: ComponentFixture<NotStorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotStorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotStorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
