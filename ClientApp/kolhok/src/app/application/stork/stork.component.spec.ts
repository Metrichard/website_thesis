import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorkComponent } from './stork.component';

describe('StorkComponent', () => {
  let component: StorkComponent;
  let fixture: ComponentFixture<StorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
