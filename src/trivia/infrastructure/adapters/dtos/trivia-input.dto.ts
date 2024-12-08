import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { TriviaInputInterface } from 'src/trivia/domain/interfaces/inputs/trivia-input.interface';

export class TriviaInputDTO implements TriviaInputInterface {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}
