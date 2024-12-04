import { Option } from "../../../../trivia/infrastructure/entities/option.entity";

export abstract class OptionRepository {
    abstract create(param: any): Promise<Option>;
    abstract getById(id: number): Promise<Option>;
    abstract getAll(): Promise<Option[]>;  
}
