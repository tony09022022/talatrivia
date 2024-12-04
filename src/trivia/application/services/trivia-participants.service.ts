import { Injectable } from '@nestjs/common';
import { TriviaParticipantsService } from 'src/trivia/domain/ports/services/trivia-participants.service';
import { TriviaParticipantsRepository } from 'src/trivia/domain/ports/repositories/trivia-participants.repository';
import { TriviaParticipantsInputDTO } from 'src/trivia/infrastructure/adapters/dtos/trivia-participants-input.dto';
import ResourceNotFound from 'src/commons/errors/resources-not-found.error';
import { ParticipationsMapper } from '../mapper/participations.mapper';
import ResourceExistsError from 'src/commons/errors/resource-exists.error';

@Injectable()
export class TriviaParticipantsServiceImpl implements TriviaParticipantsService {
  constructor(
    private readonly repository: TriviaParticipantsRepository,
  ) {}

  async getAll() {
    const participations = await this.repository.getAll();
    const participationsMapper = ParticipationsMapper.create(participations);
    
    return participationsMapper;
  }

  async create(createDto: TriviaParticipantsInputDTO) {
    const participant = await this.repository.findParticipants(createDto.usersId, createDto.triviaId);
    if(participant){
      throw new ResourceExistsError(
        'the participant',
        'UserId',
        String(createDto.usersId),
      );
    }

    return await this.repository.create(createDto);
  }

  async getParticipantsByUserId(userId: number){
    const participant = await this.repository.getParticipantsByUserId(userId);
    if (!participant) {
      throw new ResourceNotFound(
        'the participant',
        'UserId',
        String(userId),
      );
    }
    const participationsMapper = ParticipationsMapper.create(participant);
    return participationsMapper;
  }
}

