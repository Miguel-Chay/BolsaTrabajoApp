import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpAptitudesPage } from './mp-aptitudes.page';

describe('MpAptitudesPage', () => {
  let component: MpAptitudesPage;
  let fixture: ComponentFixture<MpAptitudesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpAptitudesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpAptitudesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
