import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { AnswerInputInterface } from 'src/trivia/domain/interfaces/inputs/answer-input.interface';

export class AnswerInputDTO implements AnswerInputInterface {
  @ApiProperty()
  @IsNumber()
  usersId: number;

  @ApiProperty()
  @IsNumber()
  optionId: number;
}
