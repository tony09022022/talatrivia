import { UserInputDTO } from "src/trivia/infrastructure/adapters/dtos/user-input.dto";
import { User } from "../../../../trivia/infrastructure/entities/user.entity";

export abstract class UserRepository {
    abstract getAll():Promise<User[]>;
    abstract create(userDto: UserInputDTO):Promise<User>;
    abstract getById(id: number):Promise<User>; 
    abstract getByEmail(email: string):Promise<User>; 
}
