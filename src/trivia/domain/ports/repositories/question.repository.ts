import { Question } from "../../../../trivia/infrastructure/entities/question.entity";

export abstract class QuestionRepository {
    abstract create(param: any): Promise<Question>;
    abstract getById(id: number): Promise<Question>;
    abstract getAll(): Promise<Question[]>;  
    abstract getQuestionsByTriviaId(triviaId: number): Promise<Question[]>;
}
