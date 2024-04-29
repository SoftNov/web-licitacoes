import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastraisComponent } from './dados-cadastrais.component';

describe('DadosCadastraisComponent', () => {
  let component: DadosCadastraisComponent;
  let fixture: ComponentFixture<DadosCadastraisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DadosCadastraisComponent]
    });
    fixture = TestBed.createComponent(DadosCadastraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
