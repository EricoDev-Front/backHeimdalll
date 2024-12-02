// src/professor/professor.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './entities/professor.entity';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { ProfessorRepository } from './professor.repository';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Professor]),
    forwardRef(() => AuthModule),
    MailModule
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorRepository],
  exports:[ProfessorService]
})
export class ProfessorModule {}
