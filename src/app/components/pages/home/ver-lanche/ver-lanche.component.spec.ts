import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLancheComponent } from './ver-lanche.component';

describe('VerLancheComponent', () => {
  let component: VerLancheComponent;
  let fixture: ComponentFixture<VerLancheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerLancheComponent]
    });
    fixture = TestBed.createComponent(VerLancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
