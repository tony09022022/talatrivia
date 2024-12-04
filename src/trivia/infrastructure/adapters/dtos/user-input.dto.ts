import { IsString, IsEmail, IsEnum, MinLength } from 'class-validator';
import { Role } from '../../../../trivia/domain/role.enum.ts';
import { UserInputInterface } from 'src/trivia/domain/interfaces/inputs/user-input.interface';

export class UserInputDTO implements UserInputInterface {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;
}
