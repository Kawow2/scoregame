import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameActionsButtonsComponent } from './game-actions-buttons.component';

describe('GameActionsButtonsComponent', () => {
  let component: GameActionsButtonsComponent;
  let fixture: ComponentFixture<GameActionsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameActionsButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameActionsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
