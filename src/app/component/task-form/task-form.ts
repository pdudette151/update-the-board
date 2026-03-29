import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTaskDto, TaskPriority, TaskStatus, UserProfile } from '../../model/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})

export class TaskForm {
  @Input() users: UserProfile[] = [];
  @Output() taskSubmit = new EventEmitter<CreateTaskDto>();
  @Output() cancel = new EventEmitter<void>();

  title = signal('');
  description = signal('');
  status = signal<TaskStatus>('todo');
  priority = signal<TaskPriority>('medium');
  assignedTo = signal('');

  onSubmit() {
    if (!this.title()) return;

    const taskData: CreateTaskDto = {
      title: this.title(),
      description: this.description(),
      status: this.status(),
      priority: this.priority(),
      assigned_to: this.assignedTo()
    };

    this.taskSubmit.emit(taskData);
  }

  onCancel() {
    this.cancel.emit();
  }
}