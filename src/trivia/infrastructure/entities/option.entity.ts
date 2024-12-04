import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer.entity';

@Entity({ schema: 'trivia', name: 'option' })
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Question, question => question.options)
  question: Question;

  @OneToMany(() => Answer, answer => answer.option)
  answer: Answer[];
}
