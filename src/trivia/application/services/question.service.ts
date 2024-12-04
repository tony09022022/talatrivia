import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { QuestionInputDTO } from 'src/trivia/infrastructure/adapters/dtos/question-input.dto';
import { QuestionRepository } from 'src/trivia/domain/ports/repositories/question.repository';
import { QuestionService } from 'src/trivia/domain/ports/services/question.service';
import { OptionService } from 'src/trivia/domain/ports/services/option.service';
import { OptionDTO } from 'src/trivia/infrastructure/adapters/dtos/option.dto';
import { TriviaService } from 'src/trivia/domain/ports/services/trivia.service';
import { QuestionCreateDTO } from 'src/trivia/infrastructure/adapters/dtos/question-create.dto';

@Injectable()
export class QuestionServiceImpl implements QuestionService {
  constructor(
    private readonly repository: QuestionRepository,
    @Inject(forwardRef(() => OptionService)) private readonly optionService: OptionService,
    private readonly triviaService: TriviaService,
  ) {}

  async getAll() {
    return await this.repository.getAll();
  }

  async create(createDto: QuestionInputDTO) {
    const trivia = await this.triviaService.getById(createDto.triviaId);
    const createQuestion: QuestionCreateDTO = {
        description: createDto.description,
        difficulty: createDto.difficulty,
        score: createDto.score,
        trivia: trivia
    }
    const question = await this.repository.create(createQuestion);
    
    return question;
  }

  async getById(id: number) {
    return await this.repository.getById(id);
  }

  async getQuestionsByTriviaId(triviaId: number){
    return await this.repository.getQuestionsByTriviaId(triviaId);
  }
}

