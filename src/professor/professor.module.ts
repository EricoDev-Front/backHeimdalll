// src/professor/professor.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './entities/professor.entity';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { ProfessorRepository } from './professor.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Professor]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorRepository],
})
export class ProfessorModule {}
