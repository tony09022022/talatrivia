import { IsString, IsNumber, IsEnum } from 'class-validator';
import { TriviaInputInterface } from 'src/trivia/domain/interfaces/inputs/trivia-input.interface';

export class TriviaInputDTO implements TriviaInputInterface {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
