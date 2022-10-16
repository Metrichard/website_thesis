import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragComponentComponent } from './drag-component.component';

describe('DragComponentComponent', () => {
  let component: DragComponentComponent;
  let fixture: ComponentFixture<DragComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
