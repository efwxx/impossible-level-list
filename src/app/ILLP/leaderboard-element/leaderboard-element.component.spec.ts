import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardElementComponent } from './leaderboard-element.component';

describe('LeaderboardElementComponent', () => {
  let component: LeaderboardElementComponent;
  let fixture: ComponentFixture<LeaderboardElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
