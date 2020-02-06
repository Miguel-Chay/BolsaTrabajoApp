import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPerfilBasicoPage } from './inicio-perfil-basico.page';

describe('InicioPerfilBasicoPage', () => {
  let component: InicioPerfilBasicoPage;
  let fixture: ComponentFixture<InicioPerfilBasicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioPerfilBasicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioPerfilBasicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
