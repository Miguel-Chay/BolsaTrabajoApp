import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpIdiomasPage } from './mp-idiomas.page';

describe('MpIdiomasPage', () => {
  let component: MpIdiomasPage;
  let fixture: ComponentFixture<MpIdiomasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpIdiomasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpIdiomasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
