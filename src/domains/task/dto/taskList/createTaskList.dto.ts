import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateTaskListDTO {
  @ApiProperty({ description: 'Название списка задачи' })
  @IsString()
  @MinLength(1)
  caption: string; 
}