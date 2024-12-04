import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env'],
    }),
  ],
  providers:[]
})
export class CommonModule {}
