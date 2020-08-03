import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantePage } from './vacante.page';

describe('VacantePage', () => {
  let component: VacantePage;
  let fixture: ComponentFixture<VacantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
