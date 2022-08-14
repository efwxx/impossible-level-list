import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorLeaderboardComponent } from './creator-leaderboard.component';

describe('CreatorLeaderboardComponent', () => {
  let component: CreatorLeaderboardComponent;
  let fixture: ComponentFixture<CreatorLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorLeaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
