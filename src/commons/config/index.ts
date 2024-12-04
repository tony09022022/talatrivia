import { Answer } from '../../trivia/infrastructure/entities/answer.entity';
import { Option } from '../../trivia/infrastructure/entities/option.entity';
import { Question } from '../../trivia/infrastructure/entities/question.entity';
import { TriviaParticipants } from '../../trivia/infrastructure/entities/trivia-participants.entity';
import { Trivia } from '../../trivia/infrastructure/entities/trivia.entity';
import { User } from '../../trivia/infrastructure/entities/user.entity';


export default () => ({
  env: process.env.NODE_ENV || "development",
  port: process.env.APP_PORT || 3005,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        User,
        Option,
        Question,
        Trivia,
        TriviaParticipants,
        Answer,
      ],
    schema: 'trivia',
    logging: false,
    synchronize: true,
  },
});