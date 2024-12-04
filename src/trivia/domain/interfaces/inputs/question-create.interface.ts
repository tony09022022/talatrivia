import { Trivia } from "src/trivia/infrastructure/entities/trivia.entity";
import { Difficulty } from "../../difficulty.enum";

export interface CreateQuestionInterface {
    description: string;
    difficulty: Difficulty;
    score: number;
    trivia: Trivia;
  }