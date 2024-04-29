import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicitacaoItensComponent } from './licitacao-itens.component';

describe('LicitacaoItensComponent', () => {
  let component: LicitacaoItensComponent;
  let fixture: ComponentFixture<LicitacaoItensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicitacaoItensComponent]
    });
    fixture = TestBed.createComponent(LicitacaoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
