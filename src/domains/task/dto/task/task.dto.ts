import { ApiProperty } from "@nestjs/swagger";

export class TaskDTO {
  @ApiProperty({ description: 'Id задачи' })
  id: number;

  @ApiProperty({ description: 'Название задачи' })
  caption: string;

  @ApiProperty({ description: 'Описание задачи' })
  description: string;

  @ApiProperty({ description: 'id пользователя' })
  userId: number;
}