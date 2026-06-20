import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStichingFieldsComponent } from './custom-stiching-fields.component';

describe('CustomStichingFieldsComponent', () => {
  let component: CustomStichingFieldsComponent;
  let fixture: ComponentFixture<CustomStichingFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomStichingFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomStichingFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
