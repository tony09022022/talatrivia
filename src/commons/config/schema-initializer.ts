import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SchemaInitializerService {
  constructor(private readonly dataSource: DataSource) {}

 async ensureSchemaExists() {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS talatrivia.trivia;`);
    } catch (error) {
      console.error('Error creating schema "trivia":', error);
    } finally {
      await queryRunner.release();
    }
  }
}
