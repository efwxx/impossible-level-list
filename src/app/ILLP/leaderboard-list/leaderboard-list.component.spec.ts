import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardListComponent } from './leaderboard-list.component';

describe('LeaderboardListComponent', () => {
  let component: LeaderboardListComponent;
  let fixture: ComponentFixture<LeaderboardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
