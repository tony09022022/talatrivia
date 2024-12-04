import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from '../../entities/option.entity';
import RepositoryError from '../../../../commons/errors/repository.error';
import { OptionRepository } from 'src/trivia/domain/ports/repositories/option.repository';

@Injectable()
export class OptionRepositoryImpl implements OptionRepository {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async create(param: any): Promise<Option> {
    try {
      return await this.optionRepository.save(param);
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        OptionRepositoryImpl.name,
        this.create.name,
        error.message,
      );
    }
  }

  async getById(id: number): Promise<Option> {
    try {
      return await this.optionRepository.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        OptionRepositoryImpl.name,
        this.getById.name,
        error.message,
      );
    }
  }

  async getAll(): Promise<Option[]> {
    try {
      return await this.optionRepository.find();
    } catch (error) {
      console.log(error);
      throw new RepositoryError(
        OptionRepositoryImpl.name,
        this.getAll.name,
        error.message,
      );
    }
  }
}
