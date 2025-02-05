import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairNumbersComponent } from './pair-numbers.component';

describe('PairNumbersComponent', () => {
  let component: PairNumbersComponent;
  let fixture: ComponentFixture<PairNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PairNumbersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PairNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
