import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';

// It's a good practice to mock only the methods that you're going to use.
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
});

describe('tasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    // re-initialize service for each test...
    // ...but not the database connection since it is costly and needless to.
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        // TaskRepository, // I'm not using this since it brings the whole repository and it's methods
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', () => {
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
    });
  });
});
