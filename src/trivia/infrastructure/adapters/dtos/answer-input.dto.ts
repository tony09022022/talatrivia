import { IsNumber } from 'class-validator';
import { AnswerInputInterface } from 'src/trivia/domain/interfaces/inputs/answer-input.interface';

export class AnswerInputDTO implements AnswerInputInterface {
  @IsNumber()
  usersId: number;

  @IsNumber()
  optionId: number;
}
