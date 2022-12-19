import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardCreatorComponent } from './leaderboard-creator.component';

describe('LeaderboardCreatorComponent', () => {
  let component: LeaderboardCreatorComponent;
  let fixture: ComponentFixture<LeaderboardCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
