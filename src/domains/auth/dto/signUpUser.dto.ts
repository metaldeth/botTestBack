import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpUserDTO {
  @ApiProperty({ description: 'The user name for service' })
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty({ description: 'The unique email associated with the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @MinLength(5)
  name: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  password: string;
}