import { Trivia } from "../../../../trivia/infrastructure/entities/trivia.entity";

export abstract class TriviaRepository {
    abstract create(param: any): Promise<Trivia>;
    abstract getById(id: number): Promise<Trivia>;
    abstract getAll(): Promise<Trivia[]>;  
    abstract getRanking(triviaId: number): Promise<any[]>;
}
