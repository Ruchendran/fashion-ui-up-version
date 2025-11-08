import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WearSectionComponent } from './wear-section.component';

describe('WearSectionComponent', () => {
  let component: WearSectionComponent;
  let fixture: ComponentFixture<WearSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WearSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WearSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
