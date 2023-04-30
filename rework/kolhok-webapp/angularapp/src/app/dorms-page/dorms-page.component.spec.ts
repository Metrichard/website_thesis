import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormsPageComponent } from './dorms-page.component';

describe('DormsPageComponent', () => {
  let component: DormsPageComponent;
  let fixture: ComponentFixture<DormsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
