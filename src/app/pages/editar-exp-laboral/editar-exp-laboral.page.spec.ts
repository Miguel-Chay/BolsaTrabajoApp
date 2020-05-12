import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExpLaboralPage } from './editar-exp-laboral.page';

describe('AgregarExpLaboralPage', () => {
  let component: EditarExpLaboralPage;
  let fixture: ComponentFixture<EditarExpLaboralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarExpLaboralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarExpLaboralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
