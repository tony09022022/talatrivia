import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { TriviaParticipantsInputInterface } from 'src/trivia/domain/interfaces/inputs/trivia-participants-input.interface';

export class TriviaParticipantsInputDTO implements TriviaParticipantsInputInterface {
  @ApiProperty()
  @IsNumber()
  triviaId: number;

  @ApiProperty()
  @IsNumber()
  usersId: number;
}
