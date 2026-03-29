import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../services/tasks';
import { CreateTaskDto, TaskStatus } from '../../model/task.model';
import { SprintColumn } from '../sprint-column/sprint-column';
import { TaskForm } from '../task-form/task-form';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-sprint-board',
  standalone: true,
  imports: [CommonModule, SprintColumn, TaskForm],
  templateUrl: './sprint-board.html',
  styleUrls: ['./sprint-board.css'],
})

export class SprintBoard{
  showTaskForm = signal(false);

  todoTasks = computed(() =>
    this.tasksService.getTasksByStatus('todo')
  );

  inProgressTasks = computed(() =>
    this.tasksService.getTasksByStatus('in_progress')
  );

  doneTasks = computed(() =>
    this.tasksService.getTasksByStatus('done')
  );

  blockedTasks = computed(() =>
    this.tasksService.getTasksByStatus('blocked')
  );

  completionPercentage = computed(() => {
    if (this.tasksService.tasks().length === 0){
      return 0;
    }
    return (this.doneTasks().length / this.tasksService.tasks().length)*100;
  });

  tasksService = inject(TasksService);
  authService = inject(Auth);

  async onCreateTask(taskData: CreateTaskDto) {
    await this.tasksService.createTask(taskData);
    this.showTaskForm.set(false);
  }

  async onTaskDropped(event: { taskId: string; newStatus: TaskStatus }) {
    await this.tasksService.updateTask(event.taskId, {
      status: event.newStatus
    });
  }

  async onTaskDelete(taskId: string) {
    await this.tasksService.deleteTask(taskId);
  }

  async signOut() {
    await this.authService.signOut();
  }
}