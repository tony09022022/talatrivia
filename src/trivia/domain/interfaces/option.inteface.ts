import { Question } from "../../../trivia/infrastructure/entities/question.entity";

export interface OptionInterface {
    description: string;
    isCorrect: boolean;
    question?: Question;
    questionId?: number;
  }