import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Option } from './option.entity';

@Entity({ schema: 'trivia', name: 'answer' })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.answer)
  users: User;

  @Column()
  usersId: number;

  @ManyToOne(() => Option, option => option.answer)
  option: Option;

  @Column()
  optionId: number;
}
