// src/aluno/aluno.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { AlunoRepository } from './aluno.repository';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { Turma } from 'src/turma/entities/turma.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno, Turma, Professor, Disciplina]),
    forwardRef(() => AuthModule),
    MailModule,
  ],
  controllers: [AlunoController],
  providers: [AlunoService, AlunoRepository],
  exports: [AlunoService, AlunoRepository],
})
export class AlunoModule {}
