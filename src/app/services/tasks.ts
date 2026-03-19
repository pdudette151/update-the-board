import { Injectable, signal } from '@angular/core';
import { Task, CreateTaskDto, TaskStatus } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks = signal<Task[]>([]);

  async loadTasks() {
    this.tasks.update(tasks =>
      [...tasks].sort((a, b) => a.order_index - b.order_index)
    );
  }

  async createTask(taskData: CreateTaskDto) {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description ?? '',
      status: taskData.status ?? 'todo',
      priority: taskData.priority ?? 'medium',
      assigned_to: taskData.assigned_to ?? '',
      sprint: taskData.sprint ?? '',
      order_index: taskData.order_index ?? this.tasks().length,
      in_backlog: taskData.in_backlog ?? false,
      created_at: now,
      updated_at: now,
    };

    this.tasks.update(tasks =>
      [...tasks, newTask].sort((a, b) => a.order_index - b.order_index)
    );

    return newTask;
  }

  async updateTask(id: string, updates: Partial<Task>) {
    let wasUpdated = false;

    this.tasks.update(tasks =>
      tasks
        .map(task => {
          if (task.id !== id) {
            return task;
          }

          wasUpdated = true;
          return {
            ...task,
            ...updates,
            updated_at: new Date().toISOString(),
          };
        })
        .sort((a, b) => a.order_index - b.order_index)
    );

    return wasUpdated;
  }

  async deleteTask(id: string) {
    const currentTasks = this.tasks();
    const filteredTasks = currentTasks.filter(task => task.id !== id);

    if (filteredTasks.length === currentTasks.length) {
      return false;
    }

    this.tasks.set(filteredTasks);
    return true;
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks().filter(task => task.status === status);
  }
}
