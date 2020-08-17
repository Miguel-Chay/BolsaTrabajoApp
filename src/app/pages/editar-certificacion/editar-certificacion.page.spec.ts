import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCertificacionPage } from './editar-certificacion.page';

describe('EditarCertificacionPage', () => {
  let component: EditarCertificacionPage;
  let fixture: ComponentFixture<EditarCertificacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCertificacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCertificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
