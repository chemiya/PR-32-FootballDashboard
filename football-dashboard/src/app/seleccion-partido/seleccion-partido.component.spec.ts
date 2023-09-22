import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionPartidoComponent } from './seleccion-partido.component';

describe('SeleccionPartidoComponent', () => {
  let component: SeleccionPartidoComponent;
  let fixture: ComponentFixture<SeleccionPartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionPartidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
