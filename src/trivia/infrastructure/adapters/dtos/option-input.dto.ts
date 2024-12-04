import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { OptionInputInterface } from 'src/trivia/domain/interfaces/inputs/option-input.inteface';

export class OptionInputDTO implements OptionInputInterface {
    @IsString()
    description: string;
  
    @IsBoolean()
    isCorrect: boolean;

    @IsNumber()
    questionId: number;
}