import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpExpLaboralPage } from './mp-exp-laboral.page';

describe('MpExpLaboralPage', () => {
  let component: MpExpLaboralPage;
  let fixture: ComponentFixture<MpExpLaboralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpExpLaboralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpExpLaboralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
