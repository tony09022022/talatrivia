import { Injectable } from '@nestjs/common';
import { UserService } from 'src/trivia/domain/ports/services/user.service';
import { UserInputDTO } from 'src/trivia/infrastructure/adapters/dtos/user-input.dto';
import { UserRepository } from 'src/trivia/domain/ports/repositories/user.repository';
import ResourceNotFound from 'src/commons/errors/resources-not-found.error';
import ResourceExistsError from 'src/commons/errors/resource-exists.error';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    private readonly repository: UserRepository,
  ) {}

  async getAll() {
    return await this.repository.getAll();
  }

  async create(createDto: UserInputDTO) {
    const user = await this.findByEmail(createDto.email);
    if (user) {
      throw new ResourceExistsError(
        'the User',
        'email',
        createDto.email,
      );
    }
    return await this.repository.create(createDto);
  }

  async getById(id: number) {
    const user = await this.repository.getById(id);
    if (!user) {
      throw new ResourceNotFound(
        'the User',
        'id',
        String(id),
      );
    }
    return user;
  }

  async getByEmail(email: string){
    const user = await this.repository.getByEmail(email);
    if (!user) {
      throw new ResourceNotFound(
        'the User',
        'email',
        email,
      );
    }
    return user;
  }

  async findByEmail(email: string){
    const user = await this.repository.getByEmail(email);
    return user;
  }
}

