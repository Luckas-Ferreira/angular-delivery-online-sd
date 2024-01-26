import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPedidosComponent } from './show-pedidos.component';

describe('ShowPedidosComponent', () => {
  let component: ShowPedidosComponent;
  let fixture: ComponentFixture<ShowPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPedidosComponent]
    });
    fixture = TestBed.createComponent(ShowPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
