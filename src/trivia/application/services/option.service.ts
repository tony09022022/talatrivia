import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { OptionRepository } from 'src/trivia/domain/ports/repositories/option.repository';
import { OptionService } from 'src/trivia/domain/ports/services/option.service';
import { QuestionService } from 'src/trivia/domain/ports/services/question.service';
import { OptionDTO } from 'src/trivia/infrastructure/adapters/dtos/option.dto';

@Injectable()
export class OptionServiceImpl implements OptionService {
  constructor(
    private readonly repository: OptionRepository,
    @Inject(forwardRef(() => QuestionService)) private readonly questionService: QuestionService,
  ) {}

  async getAll() {
    return await this.repository.getAll();
  }

  async create(createDto: OptionDTO) {
    const question = await this.questionService.getById(createDto.questionId);
    createDto.question = question;
    return await this.repository.create(createDto);
  }

  async getById(id: number) {
    return await this.repository.getById(id);
  }
}

