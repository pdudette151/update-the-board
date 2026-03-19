import { Routes } from '@angular/router';
import { SprintBoard } from './component/sprint-board/sprint-board';
import { TaskForm } from './component/task-form/task-form';
import { SprintColumn } from './component/sprint-column/sprint-column';
import { TaskCard }  from './component/task-card/task-card';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/board',
    pathMatch: 'full',
  },
  {
    path: 'board',
    component: SprintBoard,
    data: { title: 'Sprint Board' }
  },
  {
    path: 'board/:id',
    component: SprintBoard,
    data: { title: 'Sprint Board - Task Details' }
  },
  {
    path: 'tasks',
    component: SprintBoard,
    data: { title: 'All Tasks' }
  },
  {
    path: 'tasks/:id',
    component: SprintBoard,
    data: { title: 'Task Details' }
  },
  {
    path: 'sprints',
    component: SprintBoard,
    data: { title: 'Sprints' }
  },
  {
    path: 'sprints/:id',
    component: SprintBoard,
    data: { title: 'Sprint Details' }
  },
  {
    path: '**',
    redirectTo: '/board',
  }
];