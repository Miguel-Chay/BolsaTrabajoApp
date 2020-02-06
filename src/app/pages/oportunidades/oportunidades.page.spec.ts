import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadesPage } from './oportunidades.page';

describe('OportunidadesPage', () => {
  let component: OportunidadesPage;
  let fixture: ComponentFixture<OportunidadesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OportunidadesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OportunidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
