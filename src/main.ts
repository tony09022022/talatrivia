import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<string>('port') || 3000;

  const env = configService.get<string>('env');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Talana Trivia Api')
    .setDescription('Api for handle crud operation in talatrivia')
    .setVersion('1.0')
    .addTag('TalanaTrivia')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);
  await app.listen(port);
  console.log(`server is running on enviroment: ${env} and port: ${port} `);
}
bootstrap();
