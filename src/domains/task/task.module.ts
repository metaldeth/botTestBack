import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "src/entities/task/task.entity";
import { UserEntity } from '../../entities/index'
import { AuthModule } from "../auth/auth.module";
import { TaskController } from "./controllers";
import { TaskService } from "./services";
import { TaskListEntity } from "src/entities/taskList";
import { TaskListService } from "./services/taskList.service";
import { TaskListController } from "./controllers/taskList.controller";

@Module({
  imports: [TypeOrmModule.forFeature([
      TaskEntity,
      TaskListEntity,
      UserEntity,
    ]), 
    AuthModule,
  ],
  providers: [
    TaskService,
    TaskListService,
  ],
  controllers: [
    TaskController,
    TaskListController
  ],
})

export class TaskModule {}