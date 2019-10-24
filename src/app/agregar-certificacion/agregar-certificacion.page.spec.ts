import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCertificacionPage } from './agregar-certificacion.page';

describe('AgregarCertificacionPage', () => {
  let component: AgregarCertificacionPage;
  let fixture: ComponentFixture<AgregarCertificacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCertificacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCertificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
