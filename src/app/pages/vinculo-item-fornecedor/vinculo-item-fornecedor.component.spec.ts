import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculoItemFornecedorComponent } from './vinculo-item-fornecedor.component';

describe('ViewItemContratoComponent', () => {
  let component: VinculoItemFornecedorComponent;
  let fixture: ComponentFixture<VinculoItemFornecedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VinculoItemFornecedorComponent]
    });
    fixture = TestBed.createComponent(VinculoItemFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
