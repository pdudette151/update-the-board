import { TestBed } from '@angular/core/testing';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TasksService } from './tasks';

describe('Tasks', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
