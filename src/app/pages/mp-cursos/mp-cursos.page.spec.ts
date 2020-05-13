import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpCursosPage } from './mp-cursos.page';

describe('MpCursosPage', () => {
  let component: MpCursosPage;
  let fixture: ComponentFixture<MpCursosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpCursosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpCursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
