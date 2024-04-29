import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewContratoComponent } from './modal-view-contrato.component';

describe('ModalViewContratoComponent', () => {
  let component: ModalViewContratoComponent;
  let fixture: ComponentFixture<ModalViewContratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalViewContratoComponent]
    });
    fixture = TestBed.createComponent(ModalViewContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
