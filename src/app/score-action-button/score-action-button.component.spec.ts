import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreActionButtonComponent } from './score-action-button.component';

describe('ScoreActionButtonComponent', () => {
  let component: ScoreActionButtonComponent;
  let fixture: ComponentFixture<ScoreActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreActionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
