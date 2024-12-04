import { Injectable } from '@nestjs/common';
import { AnswerService } from 'src/trivia/domain/ports/services/answer.service';
import { AnswerRepository } from 'src/trivia/domain/ports/repositories/answer.repository';
import { AnswerInputDTO } from 'src/trivia/infrastructure/adapters/dtos/answer-input.dto';
import { AnswerMapper } from '../mapper/answer.mapper';

@Injectable()
export class AnswerServiceImpl implements AnswerService {
  constructor(
    private readonly repository: AnswerRepository,
  ) {}

  async getAll() {
    return await this.repository.getAll();
  }

  async create(createDto: AnswerInputDTO) {
     await this.repository.create(createDto);
  }

  async getByUserId(id: number) {
    const created =  await this.repository.getByUserId(id);
    const answerMapper = AnswerMapper.create(created);
    return answerMapper;
  }
}

