import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { OptionInputInterface } from 'src/trivia/domain/interfaces/inputs/option-input.inteface';

export class OptionInputDTO implements OptionInputInterface {
    @ApiProperty()
    @IsString()
    description: string;
  
    @ApiProperty()
    @IsBoolean()
    isCorrect: boolean;

    @ApiProperty()
    @IsNumber()
    questionId: number;
}