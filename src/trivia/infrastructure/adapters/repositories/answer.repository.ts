import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RepositoryError from '../../../../commons/errors/repository.error';
import { AnswerRepository } from 'src/trivia/domain/ports/repositories/answer.repository';
import { Answer } from '../../entities/answer.entity';

@Injectable()
export class AnswerRepositoryImpl implements AnswerRepository {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async create(param: any): Promise<Answer> {
    try {
      return await this.answerRepository.save(param);
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        AnswerRepositoryImpl.name,
        this.create.name,
        error.message,
      );
    }
  }

  async getByUserId(userid: number): Promise<Answer[]> {
    try {
      const results = await this.answerRepository.find({
        where: { usersId: userid },
        relations: ['users', 'option'],
      });
      return results;
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        AnswerRepositoryImpl.name,
        this.getByUserId.name,
        error.message,
      );
    }
  }

  async getAll(): Promise<Answer[]> {
    try {
      return await this.answerRepository.find();
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        AnswerRepositoryImpl.name,
        this.getAll.name,
        error.message,
      );
    }
  }
}
