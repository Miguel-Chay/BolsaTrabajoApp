import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebPage } from './prueb.page';

describe('PruebPage', () => {
  let component: PruebPage;
  let fixture: ComponentFixture<PruebPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
