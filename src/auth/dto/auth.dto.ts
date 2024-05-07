import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {

  @IsEmail()
  @MinLength(5)
  email:       string

  @IsString()
  @MinLength(5)
  password:    string

}