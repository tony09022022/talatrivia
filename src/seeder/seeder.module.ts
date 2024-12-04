import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { User } from '../trivia/infrastructure/entities/user.entity';
import { Trivia } from '../trivia/infrastructure/entities/trivia.entity';
import { Question } from '../trivia/infrastructure/entities/question.entity';
import { Option } from '../trivia/infrastructure/entities/option.entity';
import { Answer } from '../trivia/infrastructure/entities/answer.entity';
import { TriviaParticipants } from '../trivia/infrastructure/entities/trivia-participants.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from '../commons/config/db';
import { CommonModule } from '../commons/commons.module';
import { UserRepository } from '../trivia/domain/ports/repositories/user.repository';
import { UserRepositoryImpl } from '../trivia/infrastructure/adapters/repositories/user.repository';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: DatabaseConfig,
        }),
        TypeOrmModule.forFeature([
          Option,
          Question,
          Trivia,
          TriviaParticipants,
          User,
          Answer
        ]),
        CommonModule,
      ],
  providers: [
    SeederService,
    { provide: UserRepository, useClass: UserRepositoryImpl },
  ],
  exports: [SeederService],
})
export class SeederModule {}
