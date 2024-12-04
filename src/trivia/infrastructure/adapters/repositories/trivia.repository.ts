import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../entities/question.entity';
import RepositoryError from '../../../../commons/errors/repository.error';
import { TriviaRepository } from 'src/trivia/domain/ports/repositories/trivia.repository';
import { Trivia } from '../../entities/trivia.entity';

@Injectable()
export class TriviaRepositoryImpl implements TriviaRepository {
  constructor(
    @InjectRepository(Trivia)
    private triviaRepository: Repository<Trivia>,
  ) {}

  async create(param: any): Promise<Trivia> {
    try {
      return await this.triviaRepository.save(param);
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        TriviaRepositoryImpl.name,
        this.create.name,
        error.message,
      );
    }
  }

  async getById(id: number): Promise<Trivia> {
    try {
      const result = await this.triviaRepository.findOne({
        where: { id: id },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        TriviaRepositoryImpl.name,
        this.getById.name,
        error.message,
      );
    }
  }

  async getAll(): Promise<Trivia[]> {
    try {
      return await this.triviaRepository.find();
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        TriviaRepositoryImpl.name,
        this.getAll.name,
        error.message,
      );
    }
  }

  async getRanking(triviaId: number): Promise<any[]> {
    try{
      const query = await this.triviaRepository
        .createQueryBuilder('trivia')
        .leftJoinAndSelect('trivia.triviaParticipants', 'triviaParticipants')
        .leftJoinAndSelect('triviaParticipants.users', 'users')
        .leftJoinAndSelect('trivia.question', 'question')
        .leftJoinAndSelect('question.options', 'options')
        .leftJoinAndSelect('options.answer', 'answer')
        .where('trivia.id = :triviaId', { triviaId })
        .andWhere('answer.usersId = users.id')
        .andWhere('options.isCorrect = true')
        .andWhere('answer.usersId = users.id OR answer.usersId IS NULL')
        .select([
          'users.id AS userId',
          'users.name AS userName',
          'SUM(CASE WHEN options.isCorrect = true THEN question.score ELSE 0 END) AS totalScore',
        ])
        .groupBy('users.id')
        .addGroupBy('users.name')
        .orderBy('totalScore', 'DESC');

        const ranking = await query.getRawMany();
        return ranking;
      } catch (error) {
            console.error('Error retrieving ranking:', error);
            throw new RepositoryError(
              TriviaRepositoryImpl.name,
              this.getRanking.name,
              error.message,
            );
          }
        }
      }
