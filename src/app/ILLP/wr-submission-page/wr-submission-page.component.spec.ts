import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrSubmissionPageComponent } from './wr-submission-page.component';

describe('WrSubmissionPageComponent', () => {
  let component: WrSubmissionPageComponent;
  let fixture: ComponentFixture<WrSubmissionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrSubmissionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrSubmissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
