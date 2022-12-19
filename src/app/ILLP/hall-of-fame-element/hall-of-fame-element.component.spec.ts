import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallOfFameElementComponent } from './hall-of-fame-element.component';

describe('HallOfFameElementComponent', () => {
  let component: HallOfFameElementComponent;
  let fixture: ComponentFixture<HallOfFameElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallOfFameElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallOfFameElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
