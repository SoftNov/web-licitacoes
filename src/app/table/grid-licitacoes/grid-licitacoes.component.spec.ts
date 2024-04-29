import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLicitacoesComponent } from './grid-licitacoes.component';

describe('GridLicitacoesComponent', () => {
  let component: GridLicitacoesComponent;
  let fixture: ComponentFixture<GridLicitacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridLicitacoesComponent]
    });
    fixture = TestBed.createComponent(GridLicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
