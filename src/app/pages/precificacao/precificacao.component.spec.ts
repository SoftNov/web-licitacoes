import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecificacaoComponent } from './precificacao.component';

describe('PrecificacaoComponent', () => {
  let component: PrecificacaoComponent;
  let fixture: ComponentFixture<PrecificacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecificacaoComponent]
    });
    fixture = TestBed.createComponent(PrecificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
