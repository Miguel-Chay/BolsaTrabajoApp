import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionesPage } from './postulaciones.page';

describe('PostulacionesPage', () => {
  let component: PostulacionesPage;
  let fixture: ComponentFixture<PostulacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
