import { Difficulty } from "src/trivia/domain/difficulty.enum";
import { CreateQuestionInterface } from "src/trivia/domain/interfaces/inputs/question-create.interface";
import { Trivia } from "../../entities/trivia.entity";

export class QuestionCreateDTO implements CreateQuestionInterface {
    description: string;
    difficulty: Difficulty;
    score: number;
    trivia: Trivia;
  }