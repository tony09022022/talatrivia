import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../entities/question.entity';
import RepositoryError from '../../../../commons/errors/repository.error';

@Injectable()
export class QuestionRepositoryImpl {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(param: any): Promise<Question> {
    try {
      return await this.questionRepository.save(param);
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        QuestionRepositoryImpl.name,
        this.create.name,
        error.message,
      );
    }
  }

  async getById(id: number): Promise<Question> {
    try {
      return await this.questionRepository.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        QuestionRepositoryImpl.name,
        this.getById.name,
        error.message,
      );
    }
  }

  async getQuestionsByTriviaId(triviaId: number): Promise<Question[]> {
    try{
        return this.questionRepository.find({
        where: { trivia: { id: triviaId } },
        relations: ['options'],
        });
    } catch (error) {
        console.log(error);
        throw new RepositoryError(
        QuestionRepositoryImpl.name,
        this.getQuestionsByTriviaId.name,
        error.message,
        );
    }
  }

  async getAll(): Promise<Question[]> {
    try {
      return await this.questionRepository.find();
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        QuestionRepositoryImpl.name,
        this.getAll.name,
        error.message,
      );
    }
  }
}
