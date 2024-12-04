import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../trivia/infrastructure/entities/user.entity';
import { Trivia } from '../trivia/infrastructure/entities/trivia.entity';
import { Question } from '../trivia/infrastructure/entities/question.entity';
import { Option } from '../trivia/infrastructure/entities/option.entity';
import { Answer } from '../trivia/infrastructure/entities/answer.entity';
import { TriviaParticipants } from '../trivia/infrastructure/entities/trivia-participants.entity';
import { Role } from '../trivia/domain/role.enum.ts';
import { Difficulty } from '../trivia/domain/difficulty.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Trivia)
    private readonly triviaRepository: Repository<Trivia>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(TriviaParticipants)
    private readonly triviaParticipantsRepository: Repository<TriviaParticipants>,
  ) {}

  async seed(): Promise<void> {
    console.log('Iniciando carga de base datos...');
    
    // Insertar Usuarios
    const hashedPasswordUser1 = await bcrypt.hash('123456', 10);
    const hashedPasswordUser2 = await bcrypt.hash('654321', 10);
    const hashedPasswordUser3 = await bcrypt.hash('mamapapa', 10);
    const usuarios = await this.userRepository.save([
      { name: 'Jose Diaz', email: 'antony.diaz.v@gmail.com', password: hashedPasswordUser1, role: Role.ADMINISTRATOR },
      { name: 'Consuelo Ballesteros', email: 'consu@gmail.com', password: hashedPasswordUser2, role: Role.PARTICIPANT },
      { name: 'Lucas Díaz', email: 'lucas@gmail.com', password: hashedPasswordUser3, role: Role.PARTICIPANT },
    ]);

    // Insertar Trivia
    const trivias = await this.triviaRepository.save([
        {
          name: 'Conocimientos Generales',
          description: 'Un juego de trivia sobre conocimientos generales',
        },
      ]);

    // Insertar Preguntas
    const preguntas = await this.questionRepository.save([
        {
          description: '¿Cuál es la capital de Francia?',
          difficulty: Difficulty.EASY,
          score: 1,
          trivia: trivias[0],
        },
        {
          description: '¿Cuál es el planeta más grande de nuestro sistema solar?',
          difficulty: Difficulty.MEDIUM,
          score: 2,
          trivia: trivias[0],
        }
      ]);

    // Insertar Opciones de preguntas
    const opciones = await this.optionRepository.save([
        {
          description: 'París',
          isCorrect: true,
          question: preguntas[0],
        },
        {
          description: 'Londres',
          isCorrect: false,
          question: preguntas[0],
        },
        {
          description: 'Júpiter',
          isCorrect: true,
          question: preguntas[1],
        },
        {
          description: 'Saturno',
          isCorrect: false,
          question: preguntas[1],
        }
      ]);

      //Insertar Participantes
      const participantesTrivia = await this.triviaParticipantsRepository.save([
        {
          trivia: trivias[0],
          users: usuarios[0],
        },
        {
          trivia: trivias[0],
          users: usuarios[1],
        },
        {
            trivia: trivias[0],
            users: usuarios[2],
          }
      ]);
  

    // Insertar Respuestas
    await this.answerRepository.save([
        {
          users: usuarios[0],
          option: opciones[0],
        },
        {
          users: usuarios[1],
          option: opciones[2],
        },
        {
            users: usuarios[2],
            option: opciones[1],
        }
      ]);

      console.log('Base de datos inicializada con datos para pruebas...');
  }
}
