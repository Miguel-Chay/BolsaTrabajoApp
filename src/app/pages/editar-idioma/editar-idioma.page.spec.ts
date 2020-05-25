import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIdiomaPage } from './editar-idioma.page';

describe('EditarIdiomaPage', () => {
  let component: EditarIdiomaPage;
  let fixture: ComponentFixture<EditarIdiomaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarIdiomaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarIdiomaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
