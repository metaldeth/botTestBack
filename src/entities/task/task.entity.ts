import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BasicEntity } from "../base.entity";
import { TaskListEntity } from "../taskList";
import { UserEntity } from "../user/user.entity";

@Entity({ name: 'task' })
export class TaskEntity extends BasicEntity { 
  @Column({ type: 'varchar', length: 255 })
  caption: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'int', nullable: false })
  taskListId: number;

  @ManyToOne(() => TaskListEntity, (taskList) => taskList.listOfTask)
  taskList: TaskListEntity;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.listOfTask)
  user: UserEntity;
}