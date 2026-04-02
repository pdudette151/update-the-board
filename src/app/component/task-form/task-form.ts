import { Component, Input, Output, EventEmitter, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTaskDto, Task, TaskPriority, TaskStatus, UserProfile } from '../../model/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})

export class TaskForm implements OnInit {
  @Input() users: UserProfile[] = [];
  @Input() editTask: Task | null = null;
  @Output() taskUpdate = new EventEmitter<{ id: string, updates: Partial<Task> }>();
  @Output() taskSubmit = new EventEmitter<CreateTaskDto>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
    if (this.editTask) {
      this.title.set(this.editTask.title);
      this.description.set(this.editTask.description);
      this.status.set(this.editTask.status);
      this.priority.set(this.editTask.priority);
      this.assignedTo.set(this.editTask.assigned_to);
    }
  }

  title = signal('');
  description = signal('');
  status = signal<TaskStatus>('todo');
  priority = signal<TaskPriority>('medium');
  assignedTo = signal('');

  onSubmit() {
  if (!this.title()) return;

  if (this.editTask) {
    this.taskUpdate.emit({
      id: this.editTask.id,
        updates: {
        title: this.title(),
        description: this.description(),
        status: this.status(),
        priority: this.priority(),
        assigned_to: this.assignedTo(),
        }
      });
   } else {
    const taskData: CreateTaskDto = {
      title: this.title(),
      description: this.description(),
      status: this.status(),
      priority: this.priority(),
      assigned_to: this.assignedTo()
    };
    this.taskSubmit.emit(taskData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}