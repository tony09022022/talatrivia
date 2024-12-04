import { AnswerInputDTO } from "src/trivia/infrastructure/adapters/dtos/answer-input.dto";

export abstract class AnswerService {
    abstract getAll();
    abstract create(createDto: AnswerInputDTO);
    abstract getByUserId(id: number); 
}
