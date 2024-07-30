import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskService } from '../services';
import { CreateTaskDTO, EditTaskDTO, TaskDTO } from '../dto';
import { JwtAuthGuard } from 'src/domains/auth/guards';

@ApiTags('Задачи')
@Controller()
export class TaskController {
  constructor(private service: TaskService) {}

  @ApiOperation({ summary: 'Получение списка задач по id листа' })
  @ApiBearerAuth()
  @ApiResponse({ type: TaskDTO, isArray: true, status: 200 })
  @ApiParam({ name: 'taskListId', description: 'id списка задач' })
  @UseGuards(JwtAuthGuard)
  @Get('/task/list/:taskListId')
  public async getListOfTaskBytaskListId(
    @Param('taskListId') taskListId: number
  ): Promise<TaskDTO[]> {
    return await this.service.getListOfTaskBytaskListId(taskListId);
  }  

  @ApiOperation({ summary: 'Получение задачи по id' })
  @ApiBearerAuth()
  @ApiResponse({ type: TaskDTO, isArray: false, status: 200 })
  @ApiResponse({ status: 404 })
  @ApiParam({ name: 'taskid', description: 'id задачи' })
  @UseGuards(JwtAuthGuard)
  @Get('/task/:taskid')
  public async getTaskById(
    @Param('taskid') taskid: number
  ): Promise<TaskDTO> {
    return await this.service.getTaskById(taskid);
  }  

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateTaskDTO })
  @ApiResponse({ type: Number, status: 200 })
  @ApiResponse({ status: 404 })
  @ApiParam({ name: 'userId', description: 'id пользователя' })
  @ApiParam({ name: 'taskListId', description: 'id списка задач' })
  @UseGuards(JwtAuthGuard)
  @Post('/task/:userId/:taskListId')
  public async createTask(
    @Body() data: CreateTaskDTO,
    @Param('userId') userId: number,
    @Param('taskListId') taskListId: number
  ): Promise<number> {
    return await this.service.createTask(data, userId, taskListId);
  }

  @ApiOperation({ summary: 'Изменения задачи' })
  @ApiBearerAuth()
  @ApiBody({ type: EditTaskDTO })
  @ApiResponse({  status: 200, description: "Response hasn't body" })
  @ApiResponse({ status: 404 })
  @ApiParam({ name: 'taskId', description: 'id задачи' })
  @UseGuards(JwtAuthGuard)
  @Patch('/task/:taskId')
  public async editTask(
    @Body() data: EditTaskDTO,
    @Param() taskId: number
  ): Promise<void> {
    return await this.service.editTask(data, taskId);
  }

  @ApiOperation({ summary: 'Удаление задачи по id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Response hasn't body" })
  @ApiParam({ name: 'taskId', description: 'id задачи' })  
  @UseGuards(JwtAuthGuard)
  @Delete('/task/:taskId')
  public async deleteTask(
    @Param('taskId') taskId: number,
  ): Promise<void> {
    return this.service.deleteTask(taskId)
  }
}