import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  username: string;

  @IsNotEmpty()
  @Length(6, 50)
  @IsString()
  password: string;
}
