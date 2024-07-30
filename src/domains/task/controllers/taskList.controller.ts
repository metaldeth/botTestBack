import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskListService } from '../services/taskList.service';
import { isArray } from 'class-validator';
import { TaskListDTO } from '../dto/taskList/taskList.dto';
import { CreateTaskListDTO } from '../dto/taskList/createTaskList.dto';
import { EditTaskDTO } from '../dto';
import { JwtAuthGuard } from 'src/domains/auth/guards';
import { EditTaskListDTO } from '../dto/taskList/editTaskList.dto';

@ApiTags('Списки задач')
@Controller()
export class TaskListController {
  constructor(private service: TaskListService) {}

  @ApiOperation({ summary: 'Получение массива списков задач' })
  @ApiBearerAuth()
  @ApiResponse({ type: TaskListDTO, isArray: true, status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('/taskList/list')
  public async getListOfTaskList(): Promise<TaskListDTO[]> {
    return await this.service.getListOfTaskList();
  }  

  @ApiOperation({ summary: 'Получение списка задач по id' })
  @ApiBearerAuth()
  @ApiResponse({ type: TaskListDTO, isArray: false, status: 200 })
  @ApiResponse({ status: 404 })
  @ApiParam({ name: 'taskListId', description: 'id списка задач' })
  @UseGuards(JwtAuthGuard)
  @Get('/taskList/:taskListId')
  public async getTaskListById(
    @Param('taskListId') taskListId: number
  ): Promise<TaskListDTO> {
    return await this.service.getTaskListById(taskListId);
  }  

  @ApiOperation({ summary: 'Создание списка задач' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateTaskListDTO })
  @ApiResponse({ type: Number, status: 200 })
  @ApiResponse({ status: 404 })
  @ApiParam({ name: 'userId', description: 'id пользователя' })
  @UseGuards(JwtAuthGuard)
  @Post('/taskList/:userId')
  public async createTaskList(
    @Body() data: CreateTaskListDTO,
    @Param('userId') userId: number
  ): Promise<number> {
    return await this.service.createTaskList(data, userId);
  }

  @ApiOperation({ summary: 'Изменения списка задач' })
  @ApiBearerAuth()
  @ApiBody({ type: EditTaskListDTO })
  @ApiResponse({  status: 200, description: "Response hasn't body" })
  @ApiResponse({ status: 404 })
  @ApiParam({ name: 'taskListId', description: 'id списка задач' })
  @UseGuards(JwtAuthGuard)
  @Patch('/taskList/:taskListId')
  public async editTaskList(
    @Body() data: EditTaskListDTO,
    @Param('taskListId') taskListId: number
  ): Promise<void> {
    return await this.service.editTaskList(data, taskListId);
  }

  @ApiOperation({ summary: 'Удаление списка задач по id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Response hasn't body" })
  @ApiParam({ name: 'taskListId', description: 'id списка задач' })  
  @UseGuards(JwtAuthGuard)
  @Delete('/taskList/:taskListId')
  public async removeWorker(
    @Param('taskListId') taskListId: number,
  ): Promise<void> {
    return this.service.deleteTaskList(taskListId)
  }
}