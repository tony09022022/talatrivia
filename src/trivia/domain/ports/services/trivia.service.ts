import { CreateTriviaDto } from "src/trivia/infrastructure/adapters/dtos/create-trivia-input.dto";
import { TriviaInputDTO } from "src/trivia/infrastructure/adapters/dtos/trivia-input.dto";

export abstract class TriviaService {
    abstract getAll();
    abstract create(createDto: TriviaInputDTO);
    abstract createTrivia(createTriviaDto: CreateTriviaDto);
    abstract getById(id: number); 
    abstract getRanking(triviaId: number): Promise<any[]>;
}
