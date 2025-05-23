import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndLeaderboardComponent } from './end-leaderboard.component';

describe('EndLeaderboardComponent', () => {
  let component: EndLeaderboardComponent;
  let fixture: ComponentFixture<EndLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndLeaderboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
