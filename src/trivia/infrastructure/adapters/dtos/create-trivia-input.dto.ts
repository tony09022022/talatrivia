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
import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateOptionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @ApiProperty()
    @IsBoolean()
    isCorrect: boolean;
  }
  
  export class CreateQuestionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @ApiProperty()
    @IsEnum(Difficulty, { message: 'Difficulty must be easy, medium, or dificulty' })
    difficulty: Difficulty;
  
    @ApiProperty()
    @IsInt()
    @IsPositive()
    score: number;
  
    @ApiProperty()
    @IsArray()
    @ArrayMinSize(2, { message: 'Each question must have at least two options' })
    @ValidateNested({ each: true })
    @Type(() => CreateOptionDto)
    options: CreateOptionDto[];
  }
  
  export class CreateTriviaDto implements CreateTriviaInterface {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsArray()
    @ArrayNotEmpty({ message: 'Trivia must include at least one question' })
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: CreateQuestionDto[];
  
    @ApiProperty()
    @IsArray()
    @ArrayNotEmpty({ message: 'Trivia must have at least one user assigned' })
    @IsInt({ each: true })
    users: number[];
  }
  