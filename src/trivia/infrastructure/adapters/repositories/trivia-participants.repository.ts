import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RepositoryError from '../../../../commons/errors/repository.error';
import { TriviaParticipantsRepository } from 'src/trivia/domain/ports/repositories/trivia-participants.repository';
import { TriviaParticipants } from '../../entities/trivia-participants.entity';
import { use } from 'passport';

@Injectable()
export class TriviaParticipantsRepositoryImpl implements TriviaParticipantsRepository {
  constructor(
    @InjectRepository(TriviaParticipants)
    private repository: Repository<TriviaParticipants>,
  ) {}

  async create(param: any): Promise<TriviaParticipants> {
    try {
      return await this.repository.save(param);
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        TriviaParticipantsRepositoryImpl.name,
        this.create.name,
        error.message,
      );
    }
  }

  async getParticipantsByUserId(userId: number): Promise<any> {
    try {
      const results = await this.repository.find({
        where: { usersId: userId },
        relations: ['users', 'trivia', 'trivia.question', 'trivia.question.options'],
      });
      return results;
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        TriviaParticipantsRepositoryImpl.name,
        this.getParticipantsByUserId.name,
        error.message,
      );
    }
  }

  async findParticipants(userId: number, triviaId): Promise<any> {
    try {
      const results = await this.repository.findOne({
        where: { usersId: userId, triviaId: triviaId },
      });
      return results;
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        TriviaParticipantsRepositoryImpl.name,
        this.findParticipants.name,
        error.message,
      );
    }
  }

  async getAll(): Promise<TriviaParticipants[]> {
    try {
      return await this.repository.find({
        relations: ['users', 'trivia', 'trivia.question', 'trivia.question.options' ],
      });
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        TriviaParticipantsRepositoryImpl.name,
        this.getAll.name,
        error.message,
      );
    }
  }
}
