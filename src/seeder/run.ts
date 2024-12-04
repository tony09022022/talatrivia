import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seederService = app.get(SeederService);

  try {
    console.log('Comenzando inserción de datos...');
    await seederService.seed();
    console.log('Inserción de datos completado con exito!');
  } catch (error) {
    console.error('Inserción de datos fallo: ', error);
  } finally {
    await app.close();
  }
}

bootstrap();
