import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateTaskDTO {
  @ApiProperty({ description: 'Название задачи' })
  @IsString()
  @MinLength(1)
  caption: string; 

  @ApiProperty({ description: 'Описание задачи' })
  @IsString()
  @MinLength(1)
  description: string;
}