import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateZakatComponent } from './calculate-zakat.component';

describe('CalculateZakatComponent', () => {
  let component: CalculateZakatComponent;
  let fixture: ComponentFixture<CalculateZakatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateZakatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateZakatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
