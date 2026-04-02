import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './component/login/login';
import { SprintBoard } from './component/sprint-board/sprint-board';
import { SprintColumn } from './component/sprint-column/sprint-column';
import { TaskCard } from './component/task-card/task-card';
import { TaskForm } from './component/task-form/task-form';
import { Auth } from './services/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login ,SprintBoard, SprintColumn, TaskCard, TaskForm],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  auth = inject(Auth);
  currentUser = toSignal(this.auth.currentUser$);
  protected readonly title = signal('update-the-board');
}
