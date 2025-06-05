import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreActionsButtonsComponent } from './score-actions-buttons.component';

describe('ScoreActionsButtonsComponent', () => {
  let component: ScoreActionsButtonsComponent;
  let fixture: ComponentFixture<ScoreActionsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreActionsButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreActionsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
