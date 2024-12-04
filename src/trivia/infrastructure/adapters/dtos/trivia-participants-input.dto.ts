import { IsString, IsNumber, IsEnum } from 'class-validator';
import { TriviaParticipantsInputInterface } from 'src/trivia/domain/interfaces/inputs/trivia-participants-input.interface';

export class TriviaParticipantsInputDTO implements TriviaParticipantsInputInterface {
  @IsNumber()
  triviaId: number;

  @IsNumber()
  usersId: number;
}
