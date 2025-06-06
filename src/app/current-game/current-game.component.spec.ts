import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentGameComponent } from './current-game.component';

describe('CurrentGameComponent', () => {
  let component: CurrentGameComponent;
  let fixture: ComponentFixture<CurrentGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
