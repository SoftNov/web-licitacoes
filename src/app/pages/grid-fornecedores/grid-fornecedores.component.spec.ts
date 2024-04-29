import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFornecedoresComponent } from './grid-fornecedores.component';

describe('GridFornecedoresComponent', () => {
  let component: GridFornecedoresComponent;
  let fixture: ComponentFixture<GridFornecedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridFornecedoresComponent]
    });
    fixture = TestBed.createComponent(GridFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
