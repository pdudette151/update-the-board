import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SprintBoard } from './component/sprint-board/sprint-board';
import { SprintColumn } from './component/sprint-column/sprint-column';
import { TaskCard } from './component/task-card/task-card';
import { TaskForm } from './component/task-form/task-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SprintBoard, SprintColumn, TaskCard, TaskForm],
  templateUrl: './app.html',
  styleUrls: [
    './app.css',
    './component/sprint-board/sprint-board.css',
    './component/sprint-column/sprint-column.css',
    './component/task-card/task-card.css',
    './component/task-form/task-form.css'
  ]
})

export class App {
  protected readonly title = signal('update-the-board');
}
