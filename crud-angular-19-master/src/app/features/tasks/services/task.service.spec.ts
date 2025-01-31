import { TestBed, tick, waitForAsync } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { task, tasks } from '../../../__mock__/task.mock.';
import { MOCK_HTTP_RESPONSES } from '../../../__mock__/http-responses/http-responses.mock';
import { ITask } from '../model/task.model';

describe('TaskService', () => {
  let taskService: TaskService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:3000';
  let MOCKED_TASKS = [...tasks];
  let MOCKED_TASK = { ...task };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, provideHttpClient(), provideHttpClientTesting()],
    });

    taskService = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the service', () => {
    expect(taskService).toBeTruthy();
  });

  describe('getAll()', () => {
    it('should return a list of tasks', waitForAsync(() => {
      taskService
        .get()
        .subscribe(response => {
          expect(response).toEqual(MOCKED_TASKS);
          expect(taskService.tasks()).toEqual(MOCKED_TASKS);
      });

      const req = httpTestingController.expectOne(`${apiUrl}/tasks`);
      expect(req.request.method).toBe('GET');
      req.flush(MOCKED_TASKS);
    }));

    it('should return sorted tasks', () => {
      const sortedTasks = taskService
      .getSorted(MOCKED_TASKS);

      expect(sortedTasks[0]).toEqual(
        expect.objectContaining({
          id: '4',
          title: 'Analyze budget',
          isCompleted: true,
          categoryId: '2',
        })
      );
    });

    it('should throw and error when server return Internal server error', waitForAsync(() => {
      let httpErrorResponse: HttpErrorResponse | undefined;

      taskService.get().subscribe({
        next: () => {
          fail('failed to fetch the tasks list');
        },
        error: (error: HttpErrorResponse) => {
          httpErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(`${apiUrl}/tasks`);

      req.flush('Internal server error', MOCK_HTTP_RESPONSES.INTERNAL_SERVER_ERROR);

      if (!httpErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httpErrorResponse.status).toEqual(500);
      expect(httpErrorResponse.statusText).toEqual('Internal Server Error');
    }));
  });

  describe('create', () => {
    it('should create a new task', () => {
      let task: ITask | undefined;

      taskService.create(MOCKED_TASK).subscribe(response => {
        task = response;
      });

      const req = httpTestingController.expectOne(`${apiUrl}/tasks`);

      req.flush(MOCKED_TASK);

      expect(task).toEqual(MOCKED_TASK);
      expect(req.request.method).toEqual('POST');
    });

    it('should throw unprocessable entity with invalid body when create a task', waitForAsync(() => {
      let httpErrorResponse: HttpErrorResponse | undefined;

      taskService.create(MOCKED_TASK).subscribe({
        next: () => {
          fail('failed to add a new task');
        },
        error: (error: HttpErrorResponse) => {
          httpErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(`${apiUrl}/tasks`);

      req.flush('Unprocessable Entity', MOCK_HTTP_RESPONSES.UNPROCESSABLE_ENTITY);

      if (!httpErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httpErrorResponse.status).toEqual(422);
      expect(httpErrorResponse.statusText).toEqual('Unprocessable Entity');
    }));
  });

  describe('update', () => {
    it('should update a task', waitForAsync(() => {
      const updatedTask = {
        ...MOCKED_TASK,
        title: 'Play soccer with coworkers',
      };

      taskService
      .update(updatedTask)
      .subscribe(() => {
        expect(taskService.tasks()[0].title).toEqual(
          'Play soccer with coworkers'
        );
      });

      const req = httpTestingController.expectOne(
        `${apiUrl}/tasks/${updatedTask.id}`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(updatedTask);
    }));

    it('should throw unprocessable entity with invalid body when update a task', waitForAsync(() => {
      let httpErrorResponse: HttpErrorResponse | undefined;

      taskService.tasks.set([MOCKED_TASK]);

      const updatedTask = MOCKED_TASK;
      updatedTask.title = 'Go to the gym to workout legs';

      taskService.update(updatedTask).subscribe({
        next: () => {
          fail('failed to update a task');
        },
        error: (error: HttpErrorResponse) => {
          httpErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(
        `${apiUrl}/tasks/${updatedTask.id}`
      );

      req.flush('Unprocessable Entity', MOCK_HTTP_RESPONSES.UNPROCESSABLE_ENTITY);

      if (!httpErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httpErrorResponse.status).toEqual(422);
      expect(httpErrorResponse.statusText).toEqual('Unprocessable Entity');
    }));
  });

  describe('patchIsCompletedStatus()', () => {
    it('should update task status', waitForAsync(() => {
      taskService.tasks.set(MOCKED_TASKS);

      taskService
      .patchIsCompletedStatus(MOCKED_TASK.id, true)
      .subscribe(() => {
        expect(taskService.tasks()[0].isCompleted).toBeTruthy();
      });

      const req = httpTestingController.expectOne(
        `${apiUrl}/tasks/${MOCKED_TASK.id}`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush({ isCompleted: true });
    }));

    it('should throw and error when update a tasks isCompleted status', waitForAsync(() => {
      let httpErrorResponse: HttpErrorResponse | undefined;

      const updatedTask = MOCKED_TASK;
      const methodUrl = `${apiUrl}/tasks/${updatedTask.id}`;

      taskService.tasks.set(MOCKED_TASKS);

      taskService
      .patchIsCompletedStatus(updatedTask.id, true)
      .subscribe({
        next: () => {
          fail('failed to update a task isCompleted status');
        },
        error: (error: HttpErrorResponse) => {
          httpErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(methodUrl);

      req.flush('Unprocessable Entity', MOCK_HTTP_RESPONSES.UNPROCESSABLE_ENTITY);

      if (!httpErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httpErrorResponse.status).toEqual(422);
      expect(httpErrorResponse.statusText).toEqual('Unprocessable Entity');
    }));
  });

  describe('delete', () => {
    it('should delete a task', waitForAsync(() => {
      taskService.tasks.set(MOCKED_TASKS);

      taskService
      .delete(MOCKED_TASK.id)
      .subscribe(() => {
        expect(taskService.tasks().length).toEqual(3);
      });

      const req = httpTestingController.expectOne(
        `${apiUrl}/tasks/${MOCKED_TASK.id}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    }));

    it('should throw unprocessable entity with invalid body when delete a task', waitForAsync(() => {
      let httpErrorResponse: HttpErrorResponse | undefined;

      taskService.tasks.set([MOCKED_TASK]);

      taskService
      .delete(MOCKED_TASK.id)
      .subscribe({
        next: () => {
          fail('failed to delete a task');
        },
        error: (error: HttpErrorResponse) => {
          httpErrorResponse = error;
        },
      });

      const req = httpTestingController.expectOne(
        `${apiUrl}/tasks/${MOCKED_TASK.id}`
      );

      req.flush('Unprocessable Entity', MOCK_HTTP_RESPONSES.UNPROCESSABLE_ENTITY);

      if (!httpErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httpErrorResponse.status).toEqual(422);
      expect(httpErrorResponse.statusText).toEqual('Unprocessable Entity');
    }));
  });
});
