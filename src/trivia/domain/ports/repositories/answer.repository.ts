import { Answer } from "../../../../trivia/infrastructure/entities/answer.entity";

export abstract class AnswerRepository {
    abstract create(param: any): Promise<Answer>;
    abstract getByUserId(id: number): Promise<Answer[]>;
    abstract getAll(): Promise<Answer[]>;  
}
