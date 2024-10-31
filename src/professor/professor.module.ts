import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { Professor } from './entities/professor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorRepository } from './professor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorRepository],
  exports: [TypeOrmModule]
})
export class ProfessorModule {}
