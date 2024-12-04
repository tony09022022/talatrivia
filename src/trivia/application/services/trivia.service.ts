import { Injectable } from '@nestjs/common';
import { TriviaInputDTO } from 'src/trivia/infrastructure/adapters/dtos/trivia-input.dto';
import { TriviaRepository } from 'src/trivia/domain/ports/repositories/trivia.repository';
import { TriviaService } from 'src/trivia/domain/ports/services/trivia.service';
import { DataSource } from 'typeorm';
import { CreateTriviaDto } from 'src/trivia/infrastructure/adapters/dtos/create-trivia-input.dto';
import { Trivia } from '../../../trivia/infrastructure/entities/trivia.entity';
import { Question } from '../../../trivia/infrastructure/entities/question.entity';
import { Option } from '../../../trivia/infrastructure/entities/option.entity';
import { TriviaParticipants } from '../../../trivia/infrastructure/entities/trivia-participants.entity';
import ResourceNotFound from 'src/commons/errors/resources-not-found.error';
import ManagerError from 'src/commons/errors/manager.error';

@Injectable()
export class TriviaServiceImpl implements TriviaService {
  constructor(
    private readonly repository: TriviaRepository,
    private readonly dataSource: DataSource,
  ) {}

  async getAll() {
    return await this.repository.getAll();
  }

  async create(createDto: TriviaInputDTO) {
    return await this.repository.create(createDto);
  }

  async createTrivia(createTriviaDto: CreateTriviaDto) {
    try {
      const { name, description, questions, users } = createTriviaDto;
  
      return await this.dataSource.transaction(async (manager) => {
        const objTrivia = {
          name: name,
          description: description,
        };
        const trivia = await manager.save(Trivia, objTrivia);
  
        for (const questionDto of questions) {
          const { description, difficulty, score, options } = questionDto;
  
          const question = manager.create(Question, {
            description,
            difficulty,
            score,
            trivia: trivia,
          });
          await manager.save(question);
  
          const optionsCreate = options.map((option) => {
            return manager.create(Option, {
              description: option.description,
              isCorrect: option.isCorrect,
              question: question,
            });
          });
  
          await manager.save(Option, optionsCreate);
        }
  
        const participantsCreate = users.map((userId) =>
          manager.create(TriviaParticipants, {
            trivia: trivia,
            usersId: userId,
          }),
        );
        await manager.save(TriviaParticipants, participantsCreate);
  
        return trivia;
      });
    } catch (error) {
      console.log(error);
      throw new ManagerError(
        TriviaServiceImpl.name,
        this.createTrivia.name,
        error.message,
      );
    }
  }
  
  async getById(id: number) {
    const trivia = await this.repository.getById(id);
    if (!trivia) {
      throw new ResourceNotFound(
        'the id',
        'id',
        String(id),
      );
    }
    return trivia;
  }

  async getRanking(triviaId: number): Promise<any[]>{
    return await this.repository.getRanking(triviaId);
  }
}

