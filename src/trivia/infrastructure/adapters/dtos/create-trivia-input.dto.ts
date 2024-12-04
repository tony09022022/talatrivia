import {
    IsString,
    IsNotEmpty,
    IsArray,
    ValidateNested,
    IsEnum,
    IsInt,
    IsPositive,
    ArrayMinSize,
    ArrayNotEmpty,
    IsBoolean,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { CreateTriviaInterface } from 'src/trivia/domain/interfaces/inputs/create-trivia.interface';
import { Difficulty } from '../../../../trivia/domain/difficulty.enum';
  
  export class CreateOptionDto {
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsBoolean()
    isCorrect: boolean;
  }
  
  export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsEnum(Difficulty, { message: 'Difficulty must be fácil, medio, or difícil' })
    difficulty: Difficulty;
  
    @IsInt()
    @IsPositive()
    score: number;
  
    @IsArray()
    @ArrayMinSize(2, { message: 'Each question must have at least two options' })
    @ValidateNested({ each: true })
    @Type(() => CreateOptionDto)
    options: CreateOptionDto[];
  }
  
  export class CreateTriviaDto implements CreateTriviaInterface {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsArray()
    @ArrayNotEmpty({ message: 'Trivia must include at least one question' })
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: CreateQuestionDto[];
  
    @IsArray()
    @ArrayNotEmpty({ message: 'Trivia must have at least one user assigned' })
    @IsInt({ each: true })
    users: number[];
  }
  