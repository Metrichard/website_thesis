import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidencyComponent } from './presidency.component';

describe('PresidencyComponent', () => {
  let component: PresidencyComponent;
  let fixture: ComponentFixture<PresidencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresidencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
