import { UserInputDTO } from "src/trivia/infrastructure/adapters/dtos/user-input.dto";


export abstract class UserService {
    abstract getAll();
    abstract create(userDto: UserInputDTO);
    abstract getById(id: number); 
    abstract getByEmail(email: string); 
}
