import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusNegociosComponent } from './meus-negocios.component';

describe('MeusNegociosComponent', () => {
  let component: MeusNegociosComponent;
  let fixture: ComponentFixture<MeusNegociosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeusNegociosComponent]
    });
    fixture = TestBed.createComponent(MeusNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
