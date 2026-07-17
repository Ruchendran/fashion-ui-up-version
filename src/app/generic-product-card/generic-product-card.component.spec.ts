import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericProductCardComponent } from './generic-product-card.component';

describe('GenericProductCardComponent', () => {
  let component: GenericProductCardComponent;
  let fixture: ComponentFixture<GenericProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericProductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
