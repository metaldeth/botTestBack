import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BasicEntity } from "../base.entity";
import { TaskEntity } from ".";
import { UserEntity } from "../user/user.entity";

@Entity({ name: 'taskList' })
export class TaskListEntity extends BasicEntity {
  @Column({ type: 'varchar', length: 255 })
  caption: string;

  @OneToMany(() => TaskEntity, (task) => task.taskList)
  listOfTask: TaskEntity[];

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.listOfTaskList)
  user: UserEntity;
}