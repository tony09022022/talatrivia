import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, ValidateNested, ArrayMinSize, IsBoolean, IsOptional } from 'class-validator';
import { Difficulty } from '../../../domain/difficulty.enum';
import { QuestionInputInterface } from 'src/trivia/domain/interfaces/inputs/question-input.interface';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionInputDTO implements QuestionInputInterface {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsNumber()
  triviaId: number;

}

