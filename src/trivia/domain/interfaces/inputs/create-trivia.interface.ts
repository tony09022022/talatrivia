import { Difficulty } from "../../difficulty.enum";

export interface CreateTriviaInterface {
    name: string;
    description: string;
    questions: {
      description: string;
      difficulty: Difficulty;
      score: number;
      options: {
        description: string;
        isCorrect: boolean;
      }[];
    }[];
    users: number[];
  }
  