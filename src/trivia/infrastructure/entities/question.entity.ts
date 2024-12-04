import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Option } from './option.entity';
import { Difficulty } from '../../../trivia/domain/difficulty.enum';
import { Trivia } from './trivia.entity';

@Entity({ schema: 'trivia', name: 'question' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Difficulty,
  })
  difficulty: Difficulty;

  @Column({ type: 'int' })
  score: number;

  @OneToMany(() => Option, option => option.question)
  options: Option[];

  @ManyToOne(() => Trivia, trivia => trivia.question)
  trivia: Trivia;
}
