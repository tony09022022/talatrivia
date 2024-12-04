import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Trivia } from './trivia.entity';

@Entity({ schema: 'trivia', name: 'trivia-participants' })
export class TriviaParticipants {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trivia, trivia => trivia.triviaParticipants)
  trivia: Trivia;

  @Column()
  triviaId: number;

  @ManyToOne(() => User, user => user.triviaParticipants)
  users: User;

  @Column()
  usersId: number;

}

