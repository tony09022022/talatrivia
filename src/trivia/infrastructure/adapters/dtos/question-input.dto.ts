import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, ValidateNested, ArrayMinSize, IsBoolean, IsOptional } from 'class-validator';
import { Difficulty } from '../../../domain/difficulty.enum';
import { QuestionInputInterface } from 'src/trivia/domain/interfaces/inputs/question-input.interface';

export class QuestionInputDTO implements QuestionInputInterface {
  @IsString()
  description: string;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsNumber()
  score: number;

  @IsNumber()
  triviaId: number;

}

