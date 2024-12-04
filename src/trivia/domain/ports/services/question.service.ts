import { QuestionInputDTO } from "src/trivia/infrastructure/adapters/dtos/question-input.dto";

export abstract class QuestionService {
    abstract getAll();
    abstract create(createDto: QuestionInputDTO);
    abstract getById(id: number); 
    abstract getQuestionsByTriviaId(triviaId: number);
}
