import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpFormAcademicaPage } from './mp-form-academica.page';

describe('MpFormAcademicaPage', () => {
  let component: MpFormAcademicaPage;
  let fixture: ComponentFixture<MpFormAcademicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpFormAcademicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpFormAcademicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
