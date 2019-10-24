import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCursoPage } from './agregar-curso.page';

describe('AgregarCursoPage', () => {
  let component: AgregarCursoPage;
  let fixture: ComponentFixture<AgregarCursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCursoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
