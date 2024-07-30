import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities";
import { TaskEntity, TaskListEntity } from "src/entities/task";
import { Repository } from "typeorm";
import { CreateTaskDTO, EditTaskDTO, TaskDTO } from "../dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskListEntity)
    private taskListRepository: Repository<TaskListEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // public async checkAccess(taskId): Promise<boolean> {
  //   const task = await this.taskRepository.findOne(taskId)

  //   if (!task) throw new NotFoundException();
  //   return !!task
  // }

  public async getListOfTaskBytaskListId(taskListId: number): Promise<TaskDTO[]> {
    console.log('taskListId, ', taskListId)

    const listOfTask = await this.taskRepository.find({
      where: { taskListId },
      order: {created_at: 'ASC'}
    })

    return listOfTask.map((task) => ({
      id: task.id, 
      caption: task.caption,
      description: task.description,
      userId: task.userId,
    }))
  }

  public async getTaskById(taskid: number): Promise<TaskDTO> {
    console.log('taskid, ', taskid)

    const task = await this.taskRepository.findOne({
      where: {id: taskid},
    })

    return {
      id: task.id, 
      caption: task.caption,
      description: task.description,
      userId: task.userId,
    }
  }

  public async createTask(data: CreateTaskDTO, userId:number, taskListId: number): Promise<number> {
    console.table({taskListId, userId})

    const user = await this.userRepository.findOne({
      where: {id: userId}
    });

    const taskList = await this.taskListRepository.findOne({
      where: {id: taskListId}
    });

    if(!user) {
      throw new NotFoundException();
    }

    if(!taskList) {
      throw new NotFoundException();
    }

    const createdTask = await this.taskRepository.save({
      ...data, user, taskList
    });

    return createdTask.id;
  }

  public async editTask(data: EditTaskDTO, params: any): Promise<void> {
    const taskId = Number(params.taskId)

    console.log('taskId, ', taskId)

    const task = await this.taskRepository.findOne({where: {id: taskId}});

    if(!task) {
      throw new NotFoundException();
    } 

    const updatedTask = {...task, ...data};

    await this.taskRepository.save(updatedTask);
  }

  public async deleteTask(taskId: number): Promise<void> {
    console.log('taskId, ', taskId)

    const task = await this.taskRepository.findOne({where: {id: taskId}});

    if(!task) {
      throw new NotFoundException();
    } 

    await this.taskRepository.delete(task.id);
  }
}