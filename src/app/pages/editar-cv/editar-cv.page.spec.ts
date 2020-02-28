import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCvPage } from './editar-cv.page';

describe('EditarCvPage', () => {
  let component: EditarCvPage;
  let fixture: ComponentFixture<EditarCvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
