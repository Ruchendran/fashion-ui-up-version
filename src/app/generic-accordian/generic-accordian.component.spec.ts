import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAccordianComponent } from './generic-accordian.component';

describe('GenericAccordianComponent', () => {
  let component: GenericAccordianComponent;
  let fixture: ComponentFixture<GenericAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericAccordianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
