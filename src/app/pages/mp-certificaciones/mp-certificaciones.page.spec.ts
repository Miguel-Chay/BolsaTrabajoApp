import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpCertificacionesPage } from './mp-certificaciones.page';

describe('MpCertificacionesPage', () => {
  let component: MpCertificacionesPage;
  let fixture: ComponentFixture<MpCertificacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpCertificacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpCertificacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
