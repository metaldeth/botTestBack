import { ApiProperty } from "@nestjs/swagger";

export class TaskListDTO {
  @ApiProperty({ description: 'Id списка задач' })
  id: number;

  @ApiProperty({ description: 'Название списка задач' })
  caption: string;

  @ApiProperty({ description: 'id пользователя' })
  userId: number;
}