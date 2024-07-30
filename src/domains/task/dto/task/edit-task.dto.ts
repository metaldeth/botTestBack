import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString, MinLength } from "class-validator";

export class EditTaskDTO {
  @ApiProperty({ description: 'Название задачи' })
  @IsString()
  @MinLength(1)
  caption: string;

  @ApiProperty({ description: 'Описание задачи' })
  @IsString()
  @MinLength(1)
  description: string;
}