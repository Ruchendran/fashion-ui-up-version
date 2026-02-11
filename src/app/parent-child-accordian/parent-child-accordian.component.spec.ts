import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildAccordianComponent } from './parent-child-accordian.component';

describe('ParentChildAccordianComponent', () => {
  let component: ParentChildAccordianComponent;
  let fixture: ComponentFixture<ParentChildAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentChildAccordianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentChildAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
