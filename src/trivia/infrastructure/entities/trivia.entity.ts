import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { TriviaParticipants } from './trivia-participants.entity';
import { Question } from './question.entity';

@Entity({ schema: 'trivia', name: 'trivia' })
export class Trivia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => TriviaParticipants, triviaParticipants => triviaParticipants.trivia)
  triviaParticipants: TriviaParticipants[];

  @OneToMany(() => Question, question => question.trivia)
  question: Question[];
}