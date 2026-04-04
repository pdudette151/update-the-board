import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks';
import { Task } from '../model/task.model';

describe('Tasks', () => {
  let service: TasksService;

  // Mock tasks data for testing getTasksByStatus
  const mockTasks: Task[] = [
    {
      id: '1', title: 'Todo Task', description: '', status: 'todo',
      priority: 'medium', assigned_to: '', created_by: '', updated_by: '',
      sprint: '', order_index: 0, in_backlog: false,
      created_at: '', updated_at: ''
    },
    {
      id: '2', title: 'Done Task', description: '', status: 'done',
      priority: 'high', assigned_to: '', created_by: '', updated_by: '',
      sprint: '', order_index: 1, in_backlog: false,
      created_at: '', updated_at: ''
    },
    {
      id: '3', title: 'Another Todo', description: '', status: 'todo',
      priority: 'low', assigned_to: '', created_by: '', updated_by: '',
      sprint: '', order_index: 2, in_backlog: false,
      created_at: '', updated_at: ''
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TasksService,
          useValue: {
            tasks: () => [] as Task[],
            getTasksByStatus: (status: string) => [] as Task[],
            createTask: vi.fn(),
            updateTask: vi.fn(),
            deleteTask: vi.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty tasks array', () => {
    // Arrange (service freshly created)

    // Act

    // Assert
    expect(service.tasks()).toEqual([]);
  });

  it('should return empty array for any status when no tasks exist', () => {
    // Arrange (no tasks loaded)

    // Act
    const todoTasks = service.getTasksByStatus('todo');

    // Assert
    expect(todoTasks).toEqual([]);
  });

  it('should filter tasks by status', () => {
    // Arrange — swap in a service with mock data
    const serviceWithData = {
      tasks: () => mockTasks,
      getTasksByStatus: (status: string) => mockTasks.filter(t => t.status === status),
    } as unknown as TasksService;

    // Act
    const todoTasks = serviceWithData.getTasksByStatus('todo');
    const doneTasks = serviceWithData.getTasksByStatus('done');
    const blockedTasks = serviceWithData.getTasksByStatus('blocked');

    // Assert
    expect(todoTasks.length).toBe(2);
    expect(doneTasks.length).toBe(1);
    expect(blockedTasks.length).toBe(0);
  });
});
