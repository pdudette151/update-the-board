import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprintBoard } from './sprint-board';
import { TasksService } from '../../services/tasks';
import { Auth } from '../../services/auth';
import { of } from 'rxjs';

describe('SprintBoard', () => {
  let component: SprintBoard;
  let fixture: ComponentFixture<SprintBoard>;

  const mockTasksService = {
    tasks: () => [],
    getTasksByStatus: vi.fn().mockReturnValue([]),
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
  };

  const mockAuth = {
    currentUser$: of(null),
    users: () => [],
    signOut: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintBoard],
      providers: [
        { provide: TasksService, useValue: mockTasksService },
        { provide: Auth, useValue: mockAuth },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SprintBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    // Arrange
    const initialDarkMode = component.darkMode();

    // Act
    component.toggleTheme();

    // Assert
    expect(component.darkMode()).toBe(!initialDarkMode);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      component.darkMode() ? 'dark' : 'light'
    );
  });

  it('should set editingTask when onEditTask is called', () => {
    // Arrange
    const task = {
      id: '1', title: 'Test Task', description: '', status: 'todo',
      priority: 'medium', assigned_to: '', created_by: '', updated_by: '',
      sprint: '', order_index: 0, in_backlog: false,
      created_at: '', updated_at: ''
    } as any;

    // Act
    component.onEditTask(task);

    // Assert
    expect(component.editingTask()).toEqual(task);
    expect(component.showTaskForm()).toBe(true);
  });

  it('should save theme preference to localStorage', () => {
    // Arrange
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    // Act
    component.toggleTheme();

    // Assert
    expect(setItemSpy).toHaveBeenCalledWith('theme', component.darkMode() ? 'dark' : 'light');
    setItemSpy.mockRestore();
  });

  it('should hide task form and clear editingTask after creating a task', async () => {
    // Arrange
    component.showTaskForm.set(true);
    mockTasksService.createTask.mockResolvedValue(undefined);

    // Act
    await component.onCreateTask({ title: 'New Task' } as any);

    // Assert
    expect(component.showTaskForm()).toBe(false);
  });

  it('should return 0 completion percentage when there are no tasks', () => {
    // Arrange (no tasks)

    // Act
    const percentage = component.completionPercentage();

    // Assert
    expect(percentage).toBe(0);
  });
});
