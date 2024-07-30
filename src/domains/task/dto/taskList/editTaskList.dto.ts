import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class EditTaskListDTO {
  @ApiProperty({ description: 'Название списка задачи' })
  @IsString()
  @MinLength(1)
  caption: string;
}