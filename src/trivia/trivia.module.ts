import { Module } from '@nestjs/common';
import { Question } from './infrastructure/entities/question.entity';
import { Trivia } from './infrastructure/entities/trivia.entity';
import { CommonModule } from '../commons/commons.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../commons/config/db';
import { ConfigModule } from '@nestjs/config';
import { User } from './infrastructure/entities/user.entity';
import { Option } from './infrastructure/entities/option.entity';
import { QuestionRepository } from './domain/ports/repositories/question.repository';
import { QuestionRepositoryImpl } from './infrastructure/adapters/repositories/question.repository';
import { QuestionController } from './infrastructure/adapters/http/question.controller';
import { QuestionServiceImpl } from './application/services/question.service';
import { QuestionService } from './domain/ports/services/question.service';
import { OptionController } from './infrastructure/adapters/http/option.controller';
import { OptionRepository } from './domain/ports/repositories/option.repository';
import { OptionService } from './domain/ports/services/option.service';
import { OptionRepositoryImpl } from './infrastructure/adapters/repositories/option.repository';
import { OptionServiceImpl } from './application/services/option.service';
import { TriviaRepository } from './domain/ports/repositories/trivia.repository';
import { TriviaService } from './domain/ports/services/trivia.service';
import { TriviaServiceImpl } from './application/services/trivia.service';
import { TriviaController } from './infrastructure/adapters/http/trivia.controller';
import { TriviaRepositoryImpl } from './infrastructure/adapters/repositories/trivia.repository';
import { TriviaParticipantsRepository } from './domain/ports/repositories/trivia-participants.repository';
import { TriviaParticipantsService } from './domain/ports/services/trivia-participants.service';
import { TriviaParticipantsServiceImpl } from './application/services/trivia-participants.service';
import { TriviaParticipantsRepositoryImpl } from './infrastructure/adapters/repositories/trivia-participants.repository';
import { TriviaParticipantsController } from './infrastructure/adapters/http/trivia-participants.controller';
import { Answer } from './infrastructure/entities/answer.entity';
import { TriviaParticipants } from './infrastructure/entities/trivia-participants.entity';
import { AnswerRepository } from './domain/ports/repositories/answer.repository';
import { AnswerService } from './domain/ports/services/answer.service';
import { AnswerRepositoryImpl } from './infrastructure/adapters/repositories/answer.repository';
import { AnswerServiceImpl } from './application/services/answer.service';
import { AnswerController } from './infrastructure/adapters/http/answer.controller';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from './domain/ports/repositories/user.repository';
import { UserService } from './domain/ports/services/user.service';
import { UserRepositoryImpl } from './infrastructure/adapters/repositories/user.repository';
import { UserServiceImpl } from './application/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './infrastructure/adapters/http/user.controller';

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
      controllers: [
        QuestionController,
        OptionController,
        TriviaController,
        TriviaParticipantsController,
        AnswerController,
        AuthController,
        UserController
      ],
      providers: [
        { provide: QuestionRepository, useClass: QuestionRepositoryImpl },
        { provide: QuestionService, useClass: QuestionServiceImpl },
        { provide: OptionRepository, useClass: OptionRepositoryImpl },
        { provide: OptionService, useClass: OptionServiceImpl },
        { provide: TriviaRepository, useClass: TriviaRepositoryImpl },
        { provide: TriviaService, useClass: TriviaServiceImpl },
        { provide: TriviaParticipantsRepository, useClass: TriviaParticipantsRepositoryImpl },
        { provide: TriviaParticipantsService, useClass: TriviaParticipantsServiceImpl },
        { provide: AnswerRepository, useClass: AnswerRepositoryImpl },
        { provide: AnswerService, useClass: AnswerServiceImpl },
        { provide: UserRepository, useClass: UserRepositoryImpl },
        { provide: UserService, useClass: UserServiceImpl },
        JwtService,
        AuthService
      ],
})
export class TriviaModule {}
