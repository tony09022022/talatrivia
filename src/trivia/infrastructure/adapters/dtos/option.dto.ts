import { IsString, IsNumber, IsBoolean, IsObject, IsOptional } from 'class-validator';
import { Question } from '../../entities/question.entity';
import { OptionInterface } from 'src/trivia/domain/interfaces/option.inteface';
import { ApiProperty } from '@nestjs/swagger';

export class OptionDTO implements OptionInterface {
    @ApiProperty()
    @IsString()
    description: string;
  
    @ApiProperty()
    @IsBoolean()
    isCorrect: boolean;

    @ApiProperty()
    @IsObject()
    @IsOptional()
    question?: Question;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    questionId?: number
}