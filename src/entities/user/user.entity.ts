import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BasicEntity } from "../base.entity";
import { TaskEntity, TaskListEntity } from "../taskList";


@Entity({ name: 'user' })
export class UserEntity extends BasicEntity {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: "varchar", length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;
  
  @OneToMany(() => TaskEntity, (task) => task.user)
  listOfTask: TaskEntity[];

  @OneToMany(() => TaskListEntity, (task) => task.user)
  listOfTaskList: TaskListEntity[];
}