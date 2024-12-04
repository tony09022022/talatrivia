import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TriviaModule } from './trivia/trivia.module';
import { CommonModule } from './commons/commons.module';

@Module({
  imports: [TriviaModule,CommonModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
