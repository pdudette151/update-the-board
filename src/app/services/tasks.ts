import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { Auth as FirebaseAuth } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Task, CreateTaskDto, TaskStatus } from '../model/task.model';


@Injectable({
  providedIn: 'root'
})

export class TasksService {
  private firestore = inject(Firestore);
  private auth = inject(FirebaseAuth);

  private tasksCollection = collection(this.firestore, 'tasks');

  tasks = toSignal(
    collectionData(
      query(this.tasksCollection, orderBy('order_index')),
      { idField: 'id' }
    ) as Observable<Task[]>,
    { initialValue: [] as Task[] }
  );

  async createTask(taskData: CreateTaskDto) {
  const currentUser = this.auth.currentUser;
  const now = new Date().toISOString();

  await addDoc(this.tasksCollection, {
    title: taskData.title,
    description: taskData.description ?? '',
    status: taskData.status ?? 'todo',
    priority: taskData.priority ?? 'medium',
    assigned_to: taskData.assigned_to ?? '',
    created_by: currentUser?.displayName ?? currentUser?.email ?? '',
    sprint: taskData.sprint ?? '',
    order_index: taskData.order_index ?? this.tasks().length,
    in_backlog: taskData.in_backlog ?? false,
    created_at: now,
    updated_at: now,
    });
  }

  async updateTask(id: string, updates: Partial<Task>) {
    const currentUser = this.auth.currentUser;
    const taskDoc = doc(this.firestore, 'tasks', id);
   await updateDoc(taskDoc, {
      ...updates,
      updated_at: new Date().toISOString(),
      updated_by: currentUser?.displayName ?? currentUser?.email ?? '',
    });
    return true;
  }


  async deleteTask(id: string) {
    const taskDoc = doc(this.firestore, 'tasks', id);
    await deleteDoc(taskDoc);
    return true;
  }


  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks().filter(task => task.status === status);
  }
}
