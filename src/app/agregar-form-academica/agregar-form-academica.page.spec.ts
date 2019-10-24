import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFormAcademicaPage } from './agregar-form-academica.page';

describe('AgregarFormAcademicaPage', () => {
  let component: AgregarFormAcademicaPage;
  let fixture: ComponentFixture<AgregarFormAcademicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarFormAcademicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarFormAcademicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
