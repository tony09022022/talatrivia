import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToMany } from 'typeorm';
import { TriviaParticipants } from './trivia-participants.entity';
import { Answer } from './answer.entity';
import { Role } from '../../../trivia/domain/role.enum.ts';

@Entity({ schema: 'trivia', name: 'user' })
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @OneToMany(() => TriviaParticipants, triviaParticipants => triviaParticipants.trivia)
  triviaParticipants: TriviaParticipants[];

  @OneToMany(() => Answer, answer => answer.users)
  answer: Answer[];
}
