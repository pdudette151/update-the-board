import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCard } from './task-card';
import { Task } from '../../model/task.model';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  const mockTask: Task = {
    id: 'task-123',
    title: 'Test Task',
    description: 'A test description',
    status: 'todo',
    priority: 'high',
    assigned_to: 'sabrina@test.com',
    created_by: 'creator@test.com',
    updated_by: '',
    sprint: '',
    order_index: 0,
    in_backlog: false,
    created_at: '2026-04-01T00:00:00.000Z',
    updated_at: '2026-04-01T00:00:00.000Z'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Edit ---

  it('should emit edit event with task when onEdit is called', () => {
    // Arrange
    let emittedTask: Task | undefined;
    component.edit.subscribe((task: Task) => emittedTask = task);

    // Act
    component.onEdit();

    // Assert
    expect(emittedTask).toEqual(mockTask);
  });

  it('should emit edit event when card is clicked', () => {
    // Arrange
    let emittedTask: Task | undefined;
    component.edit.subscribe((task: Task) => emittedTask = task);
    const cardElement = fixture.nativeElement.querySelector('.task-card');

    // Act
    cardElement.click();

    // Assert
    expect(emittedTask).toEqual(mockTask);
  });

  // --- Delete ---

  it('should emit delete event with task id when delete is confirmed', () => {
    // Arrange
    let emittedId: string | undefined;
    component.delete.subscribe((id: string) => emittedId = id);
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    // Act
    component.onDelete();

    // Assert
    expect(emittedId).toBe('task-123');
  });

  it('should not emit delete event when delete is cancelled', () => {
    // Arrange
    let emittedId: string | undefined;
    component.delete.subscribe((id: string) => emittedId = id);
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    // Act
    component.onDelete();

    // Assert
    expect(emittedId).toBeUndefined();
  });

  // --- Drag ---

  it('should emit dragStart event with task on drag start', () => {
    // Arrange
    let emittedTask: Task | undefined;
    component.dragStart.subscribe((task: Task) => emittedTask = task);
    const mockEvent = {
      dataTransfer: { effectAllowed: '', setData: vi.fn() }
    } as unknown as DragEvent;

    // Act
    component.onDragStart(mockEvent);

    // Assert
    expect(emittedTask).toEqual(mockTask);
    expect(mockEvent.dataTransfer!.effectAllowed).toBe('move');
    expect(mockEvent.dataTransfer!.setData).toHaveBeenCalledWith('text/plain', 'task-123');
  });

  it('should emit dragEnd event', () => {
    // Arrange
    let dragEnded = false;
    component.dragEnd.subscribe(() => dragEnded = true);
    const mockEvent = {} as DragEvent;

    // Act
    component.onDragEnd(mockEvent);

    // Assert
    expect(dragEnded).toBe(true);
  });

  // --- Rendering ---

  it('should display the task title', () => {
    // Arrange
    const titleElement = fixture.nativeElement.querySelector('.task-title');

    // Act (no action needed — testing initial render)

    // Assert
    expect(titleElement.textContent).toBe('Test Task');
  });

  it('should display the task description when present', () => {
    // Arrange
    const descElement = fixture.nativeElement.querySelector('.task-description');

    // Act

    // Assert
    expect(descElement.textContent).toBe('A test description');
  });

  it('should not display description when empty', () => {
    // Arrange
    const freshFixture = TestBed.createComponent(TaskCard);
    const freshComponent = freshFixture.componentInstance;
    freshComponent.task = { ...mockTask, description: '' };

    // Act
    freshFixture.detectChanges();

    // Assert
    const descElement = freshFixture.nativeElement.querySelector('.task-description');
    expect(descElement).toBeNull();
  });

  it('should display assigned user when present', () => {
    // Arrange
    const assignedElement = fixture.nativeElement.querySelector('.assigned-to');

    // Act

    // Assert
    expect(assignedElement.textContent).toContain('sabrina@test.com');
  });

  it('should not display assigned user when empty', () => {
    // Arrange
    const freshFixture = TestBed.createComponent(TaskCard);
    const freshComponent = freshFixture.componentInstance;
    freshComponent.task = { ...mockTask, assigned_to: '' };

    // Act
    freshFixture.detectChanges();

    // Assert
    const assignedElement = freshFixture.nativeElement.querySelector('.assigned-to');
    expect(assignedElement).toBeNull();
  });

  it('should apply priority-high class for high priority tasks', () => {
    // Arrange
    const cardElement = fixture.nativeElement.querySelector('.task-card');

    // Act

    // Assert
    expect(cardElement.classList).toContain('priority-high');
  });

  it('should apply priority-low class for low priority tasks', () => {
    // Arrange
    const freshFixture = TestBed.createComponent(TaskCard);
    const freshComponent = freshFixture.componentInstance;
    freshComponent.task = { ...mockTask, priority: 'low' };

    // Act
    freshFixture.detectChanges();

    // Assert
    const cardElement = freshFixture.nativeElement.querySelector('.task-card');
    expect(cardElement.classList).toContain('priority-low');
  });
});
