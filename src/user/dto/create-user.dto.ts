import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @MinLength(3)
  name:       string;

  @IsString()
  @MinLength(5)
  @IsEmail()
  email:      string;

  @IsString()
  @MinLength(1)
  rol:        string
  
  @IsString()
  @MinLength(5)
  password:   string
}
