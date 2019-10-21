import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantesPage } from './vacantes.page';

describe('VacantesPage', () => {
  let component: VacantesPage;
  let fixture: ComponentFixture<VacantesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
