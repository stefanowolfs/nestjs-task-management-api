import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

// since we are going to use this same user a lot, I declared it here
const mockUser = new User();
mockUser.id = 45;
mockUser.username = 'Test User';

// It's a good practice to mock only the methods that you're going to use.
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('tasksService', () => {
  let tasksService;
  let taskRepository;

  // re-initialize service for each test...
  beforeEach(async () => {
    // Create and 'compile' a new module for testing.
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        // TaskRepository, // I'm not using this since it brings the whole repository and it's methods.
        { provide: TaskRepository, useFactory: mockTaskRepository }, // 'useFactory' re-creates the mock every time.
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      const expectedResult = Array.of(new Task());
      taskRepository.getTasks.mockResolvedValue(expectedResult);

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' };
      const result = await tasksService.getTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
      const expectedResult = { title: 'Test task', description: 'Test desc' };
      const mockNumberToSatisfyParameters = 1;
      taskRepository.findOne.mockResolvedValue(expectedResult);

      const result = await tasksService.getTaskById(mockNumberToSatisfyParameters, mockUser);
      expect(result).toEqual(expectedResult);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });
  });
});
