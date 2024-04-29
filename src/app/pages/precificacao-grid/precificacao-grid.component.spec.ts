import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecificacaoGridComponent } from './precificacao-grid.component';

describe('PrecificacaoGridComponent', () => {
  let component: PrecificacaoGridComponent;
  let fixture: ComponentFixture<PrecificacaoGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecificacaoGridComponent]
    });
    fixture = TestBed.createComponent(PrecificacaoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
