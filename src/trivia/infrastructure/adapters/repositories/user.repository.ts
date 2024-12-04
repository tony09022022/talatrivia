import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RepositoryError from '../../../../commons/errors/repository.error';
import { User } from '../../entities/user.entity';
import { UserInputDTO } from '../dtos/user-input.dto';
import { UserRepository } from 'src/trivia/domain/ports/repositories/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(userDto: UserInputDTO): Promise<User> {
    try {
      return await this.repository.save(userDto);
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        UserRepositoryImpl.name,
        this.create.name,
        error.message,
      );
    }
  }

  async getById(id: number): Promise<User> {
    try {
      return await this.repository.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        UserRepositoryImpl.name,
        this.getById.name,
        error.message,
      );
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      return await this.repository.findOne({
        where: { email: email },
      });
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        UserRepositoryImpl.name,
        this.getById.name,
        error.message,
      );
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        UserRepositoryImpl.name,
        this.getAll.name,
        error.message,
      );
    }
  }
}
