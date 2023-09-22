import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPartidoComponent } from './datos-partido.component';

describe('DatosPartidoComponent', () => {
  let component: DatosPartidoComponent;
  let fixture: ComponentFixture<DatosPartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosPartidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
