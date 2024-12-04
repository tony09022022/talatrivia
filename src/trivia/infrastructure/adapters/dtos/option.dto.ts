import { IsString, IsNumber, IsBoolean, IsObject, IsOptional } from 'class-validator';
import { Question } from '../../entities/question.entity';
import { OptionInterface } from 'src/trivia/domain/interfaces/option.inteface';

export class OptionDTO implements OptionInterface {
    @IsString()
    description: string;
  
    @IsBoolean()
    isCorrect: boolean;

    @IsObject()
    @IsOptional()
    question?: Question;

    @IsNumber()
    @IsOptional()
    questionId?: number
}