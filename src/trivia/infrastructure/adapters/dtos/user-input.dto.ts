import { IsString, IsEmail, IsEnum, MinLength } from 'class-validator';
import { Role } from '../../../../trivia/domain/role.enum.ts';
import { UserInputInterface } from 'src/trivia/domain/interfaces/inputs/user-input.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UserInputDTO implements UserInputInterface {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
