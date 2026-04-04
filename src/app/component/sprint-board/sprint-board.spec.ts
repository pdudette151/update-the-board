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

  it('should toggle dark mode', () => {
    //arrange
    const initialTheme = document.documentElement.getAttribute('data-theme');
    
    //act
    component.toggleTheme();
    const newTheme = document.documentElement.getAttribute('data-theme');
    
    //assert
    expect(newTheme).not.toBe(initialTheme);
  });

  it('should set editingTask when onEditTask is called', () => {
    //arrange
    const task = { id: '1', title: 'Test Task', description: '', status: 'todo', priority: 'medium', assigned_to: '' } as any;
    
    //act
    component.onEditTask(task);
    //assert
    expect(component.editingTask()).toEqual(task);
    expect(component.showTaskForm()).toBe(true);
  });

});
