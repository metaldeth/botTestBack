import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities";
import { TaskEntity, TaskListEntity } from "src/entities/taskList";
import { Repository } from "typeorm";
import { TaskListDTO } from "../dto/taskList/taskList.dto";
import { CreateTaskListDTO } from "../dto/taskList/createTaskList.dto";
import { EditTaskListDTO } from "../dto/taskList/editTaskList.dto";

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskListEntity)
    private taskListRepository: Repository<TaskListEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // public async checkAccess(taskListId): Promise<boolean> {
  //   const taskList = await this.taskListRepository.findOne(taskListId)

  //   if (!taskList) throw new NotFoundException();
  //   return !!taskList
  // }

  public async getListOfTaskList(): Promise<TaskListDTO[]> {
    const listOfTaskList = await this.taskListRepository.find({
      order: {created_at: 'ASC'}
    })

    return listOfTaskList.map((taskList) => ({
      id: taskList.id, 
      caption: taskList.caption,
      userId: taskList.userId,
    }))
  }

  public async getTaskListById(taskListId: number): Promise<TaskListDTO> {
    console.log('taskListId, ', taskListId)

    const taskList = await this.taskListRepository.findOne(taskListId)

    if(!taskList) {
      throw new NotFoundException();
    } 

    return {
      id: taskList.id,
      caption: taskList.caption,
      userId: taskList.userId,
    }
  }

  public async createTaskList(data: CreateTaskListDTO, params: any): Promise<number> {
    console.log('params, ', params)

    const formattedUserId = Number(params.userId)

    const user = await this.userRepository.findOne({
      where: {id: formattedUserId}
    });

    if(!user) {
      throw new NotFoundException();
    }

    const createdTaskList = await this.taskListRepository.save({
      ...data, user, userId: formattedUserId
    });

    return createdTaskList.id;
  }

  public async editTaskList(data: EditTaskListDTO, params: any): Promise<void> {
    console.log('taskListId, ', params.taskListId)

    const taskList = await this.taskListRepository.findOne(Number(params.taskListId))

    if(!taskList) {
      throw new NotFoundException();
    } 

    const updatedTaskList = {...taskList, ...data};

    await this.taskListRepository.save(updatedTaskList); 
  }

  public async deleteTaskList(taskListId: number): Promise<void> {
    console.log('taskListId, ', taskListId)

    const taskList = await this.taskListRepository.findOne({where: {id: Number(taskListId)}});

    if(!taskList) {
      throw new NotFoundException();
    } 

    await this.taskListRepository.delete(taskList.id);
  }
}
