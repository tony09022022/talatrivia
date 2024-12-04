import { TriviaParticipantsInputDTO } from "src/trivia/infrastructure/adapters/dtos/trivia-participants-input.dto"

export abstract class TriviaParticipantsService {
    abstract getAll();
    abstract create(createDto: TriviaParticipantsInputDTO);
    abstract getParticipantsByUserId(userId: number);
}
