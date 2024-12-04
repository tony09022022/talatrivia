import { TriviaParticipants } from "../../../../trivia/infrastructure/entities/trivia-participants.entity";

export abstract class TriviaParticipantsRepository {
    abstract create(param: any): Promise<TriviaParticipants>;
    abstract getParticipantsByUserId(userId: number): Promise<TriviaParticipants>;
    abstract getAll(): Promise<TriviaParticipants[]>;  
    abstract findParticipants(userId: number, triviaId): Promise<any>;
}
