import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarExpLaboralPage } from './agregar-exp-laboral.page';

describe('AgregarExpLaboralPage', () => {
  let component: AgregarExpLaboralPage;
  let fixture: ComponentFixture<AgregarExpLaboralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarExpLaboralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarExpLaboralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
