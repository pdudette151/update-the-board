import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintColumn } from './sprint-column';

describe('SprintColumn', () => {
  let component: SprintColumn;
  let fixture: ComponentFixture<SprintColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintColumn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintColumn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
