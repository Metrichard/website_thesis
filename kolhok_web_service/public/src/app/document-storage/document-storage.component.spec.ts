import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStorageComponent } from './document-storage.component';

describe('DocumentStorageComponent', () => {
  let component: DocumentStorageComponent;
  let fixture: ComponentFixture<DocumentStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentStorageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
