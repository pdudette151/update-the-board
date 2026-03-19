import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprintBoard } from './sprint-board';

describe('SprintBoard', () => {
  let component: SprintBoard;
  let fixture: ComponentFixture<SprintBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
