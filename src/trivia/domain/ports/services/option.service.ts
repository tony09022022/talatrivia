import { OptionDTO } from "src/trivia/infrastructure/adapters/dtos/option.dto";

export abstract class OptionService {
    abstract getAll();
    abstract create(createDto: OptionDTO);
    abstract getById(id: number); 
}
