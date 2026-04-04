import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskForm } from './task-form';
import { Task, CreateTaskDto } from '../../model/task.model';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;

  const mockTask: Task = {
    id: 'task-123',
    title: 'Existing Task',
    description: 'Existing description',
    status: 'in_progress',
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
      imports: [TaskForm]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Create Mode ---

  it('should emit taskSubmit with form data in create mode', () => {
    // Arrange
    let emittedData: CreateTaskDto | undefined;
    component.taskSubmit.subscribe((data: CreateTaskDto) => emittedData = data);
    component.title.set('New Task');
    component.description.set('New description');
    component.status.set('todo');
    component.priority.set('medium');
    component.assignedTo.set('test@test.com');

    // Act
    component.onSubmit();

    // Assert
    expect(emittedData).toEqual({
      title: 'New Task',
      description: 'New description',
      status: 'todo',
      priority: 'medium',
      assigned_to: 'test@test.com'
    });
  });

  it('should not emit taskSubmit when title is empty', () => {
    // Arrange
    let emitted = false;
    component.taskSubmit.subscribe(() => emitted = true);
    component.title.set('');

    // Act
    component.onSubmit();

    // Assert
    expect(emitted).toBe(false);
  });

  it('should have default values for new task form', () => {
    // Arrange (component is freshly created)

    // Act

    // Assert
    expect(component.title()).toBe('');
    expect(component.description()).toBe('');
    expect(component.status()).toBe('todo');
    expect(component.priority()).toBe('medium');
    expect(component.assignedTo()).toBe('');
  });

  // --- Edit Mode ---

  it('should pre-fill form fields when editTask is provided', () => {
    // Arrange
    component.editTask = mockTask;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.title()).toBe('Existing Task');
    expect(component.description()).toBe('Existing description');
    expect(component.status()).toBe('in_progress');
    expect(component.priority()).toBe('high');
    expect(component.assignedTo()).toBe('sabrina@test.com');
  });

  it('should emit taskUpdate in edit mode', () => {
    // Arrange
    let emittedUpdate: { id: string, updates: Partial<Task> } | undefined;
    component.taskUpdate.subscribe((data: { id: string, updates: Partial<Task> }) => emittedUpdate = data);
    component.editTask = mockTask;
    component.ngOnInit();
    component.title.set('Updated Title');

    // Act
    component.onSubmit();

    // Assert
    expect(emittedUpdate).toBeDefined();
    expect(emittedUpdate!.id).toBe('task-123');
    expect(emittedUpdate!.updates.title).toBe('Updated Title');
    expect(emittedUpdate!.updates.description).toBe('Existing description');
  });

  it('should not emit taskSubmit in edit mode', () => {
    // Arrange
    let createEmitted = false;
    component.taskSubmit.subscribe(() => createEmitted = true);
    component.editTask = mockTask;
    component.ngOnInit();

    // Act
    component.onSubmit();

    // Assert
    expect(createEmitted).toBe(false);
  });

  // --- Cancel ---

  it('should emit cancel event when onCancel is called', () => {
    // Arrange
    let cancelled = false;
    component.cancel.subscribe(() => cancelled = true);

    // Act
    component.onCancel();

    // Assert
    expect(cancelled).toBe(true);
  });

  // --- Users Input ---

  it('should accept users input for dropdown', () => {
    // Arrange
    const users = [
      { uid: '1', displayName: 'Sabrina', email: 'sabrina@test.com', photoURL: null },
      { uid: '2', displayName: null, email: 'john@test.com', photoURL: null }
    ];

    // Act
    component.users = users;
    fixture.detectChanges();

    // Assert
    expect(component.users.length).toBe(2);
    expect(component.users[0].displayName).toBe('Sabrina');
    expect(component.users[1].email).toBe('john@test.com');
  });
});
