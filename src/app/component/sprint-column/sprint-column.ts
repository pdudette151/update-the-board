import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../model/task.model';
import { from } from 'rxjs';  
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-sprint-column',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './sprint-column.html',
  styleUrls: ['./sprint-column.css']
})
export class SprintColumn {
  @Input() title = '';
  @Input() status: TaskStatus = 'todo';
  @Input() tasks: Task[] = [];
  @Output() taskDropped = new EventEmitter<{ taskId: string, newStatus: TaskStatus }>();
  @Output() taskDelete = new EventEmitter<string>();

  isDragOver = false;
  dragCounter = 0;

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.dragCounter++;
    this.isDragOver = true;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.isDragOver = false;
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    this.dragCounter = 0;

    const taskId = event.dataTransfer!.getData('text/plain');
    if (taskId) {
      this.taskDropped.emit({ taskId, newStatus: this.status });
    }
  }

  onTaskDragStart(task: Task) {
    this.isDragOver = false;
    this.dragCounter = 0;
  }

  onTaskDragEnd() {
    this.isDragOver = false;
    this.dragCounter = 0;
  }
}
