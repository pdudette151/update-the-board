import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css']
})

export class TaskCard {
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    assigned_to: '',
    sprint: '',
    order_index: 0,
    in_backlog: false,
    created_at: '',
    updated_at: ''
  };
  @Output() dragStart = new EventEmitter<Task>();
  @Output() dragEnd = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  onDragStart(event: DragEvent) {
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('text/plain', this.task.id);
    this.dragStart.emit(this.task);
  }

  onDragEnd(event: DragEvent) {
    this.dragEnd.emit();
  }

  onDelete() {
    if (confirm(`Delete task "${this.task.title}"?`)) {
      this.delete.emit(this.task.id);
    }
  }
}